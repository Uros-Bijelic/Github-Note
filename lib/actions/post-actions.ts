'use server';

import { connectToMongoDB } from '../database/mongodb';
import { IPostSchema } from '../zod/post-schema';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import Post from '@/models/post';
import Tag from '@/models/tag';
import { EPostType, EQueryPostType } from '@/types/post-types';

export const createPost = async (data: IPostSchema) => {
  try {
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    await connectToMongoDB();

    const tagLabels = data.tags.map((t) => t.label.toLowerCase());

    const existingTags = await Tag.find({
      title: { $in: tagLabels.map((tag) => new RegExp(`^${tag}$`, 'i')) },
    });

    const existingTagsTitles = existingTags?.map((t) => t.title.toLowerCase());
    const existingTagsIds = existingTags.map((t) => t._id);

    const tagsToCreate = data.tags
      .filter((t) => !existingTagsTitles.includes(t.label.toLowerCase()))
      .map((t) => ({ title: t.label, ownerId: session.user.id }));

    let createdTags: mongoose.Types.ObjectId[] = [];
    if (tagsToCreate.length > 0) {
      createdTags = (await Tag.insertMany(tagsToCreate, { lean: true }))?.map(
        (t) => new mongoose.Types.ObjectId(t._id)
      );
    }

    const newPost = await Post.create({
      ...data,
      tags: [...existingTagsIds, ...createdTags],
      ownerId: session.user.id,
    });

    revalidatePath('/');

    return {
      ok: true,
      status: 201,
      redirectRoute: '/post/' + newPost._id.toString(),
    };
  } catch (error) {
    throw new Error('Error creating new post!');
  }
};

export const updatePost = async (postId: string, data: IPostSchema) => {
  try {
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    await connectToMongoDB();

    const post = await Post.findById(postId);
    if (!post) return { ok: false, status: 404, message: 'Post not found!' };

    if (post.ownerId.toString() !== session.user.id)
      return {
        ok: false,
        status: 403,
        message: 'You are not allowed to update the post!',
      };

    const tagLabels = data.tags.map((t) => t.label.toLowerCase());

    const existingTags = await Tag.find({
      title: { $in: tagLabels.map((tag) => new RegExp(`^${tag}$`, 'i')) },
    });

    const existingTagsTitles = existingTags?.map((t) => t.title.toLowerCase());
    const existingTagsIds = existingTags.map((t) => t._id);

    const tagsToCreate = data.tags
      .filter((t) => !existingTagsTitles.includes(t.label.toLowerCase()))
      .map((t) => ({ title: t.label, ownerId: session.user.id }));

    let createdTags: mongoose.Types.ObjectId[] = [];
    if (tagsToCreate.length > 0) {
      createdTags = (await Tag.insertMany(tagsToCreate, { lean: true }))?.map(
        (t) => new mongoose.Types.ObjectId(t._id)
      );
    }

    await Post.findByIdAndUpdate(postId, {
      ...data,
      tags: [...existingTagsIds, ...createdTags],
    });

    revalidatePath('/post/[id]', 'page');

    return {
      ok: true,
      status: 200,
      redirectRoute: '/post/' + postId,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
    };
  }
};

interface IGetAllPosts {
  page?: number;
  postType?: EQueryPostType;
  tags?: string[];
  itemsPerPage: number;
  searchQuery?: string;
}

export const getAllPosts = async ({
  page = 1,
  postType,
  tags,
  itemsPerPage,
  searchQuery,
}: IGetAllPosts) => {
  const skip = (page - 1) * itemsPerPage;

  try {
    const session = await auth();
    if (!session) throw new Error('User data not available!');

    await connectToMongoDB();

    let query: Record<string, unknown> = {
      ownerId: session.user.id,
    };

    if (searchQuery && searchQuery?.trim() !== '') {
      query = { ...query, title: { $regex: searchQuery, $options: 'i' } };
    }

    if (postType) {
      query = { ...query, type: postType.toUpperCase() as EPostType };
    }

    if (tags && tags?.length > 0) {
      const tagsArray = tags?.map((tag) => new RegExp(`^${tag}$`, 'i'));
      const fetchedTags = await Tag.find({ title: { $in: tagsArray } });
      const fetchedTagsIds = fetchedTags.map((tag) => tag._id);

      query = { ...query, tags: { $in: fetchedTagsIds } };
    }

    const posts = await Post.find(query as mongoose.QueryFilter<unknown>)
      .populate('tags')
      .skip(skip)
      .limit(itemsPerPage);

    const postsCount = await Post.find(
      query as mongoose.QueryFilter<unknown>
    ).countDocuments({});

    const totalPages = Math.ceil(postsCount / itemsPerPage);
    const hasNextPage = page < totalPages;

    return {
      ok: true,
      status: 200,
      posts: JSON.parse(JSON.stringify(posts)),
      totalPages,
      hasNextPage,
    };
  } catch (error) {
    throw new Error("Something went wrong. Couldn't show posts! ");
  }
};

export const getPostById = async (postId: string) => {
  try {
    await connectToMongoDB();

    const post = await Post.findById(postId).populate('tags').lean();

    return JSON.parse(JSON.stringify(post));
  } catch (error) {}
};

export const deletePost = async (postId: string) => {
  try {
    await connectToMongoDB();
    const session = await auth();

    const post = await Post.findById(postId);
    if (!post) return { ok: false, status: 404, message: 'Post not found!' };
    if (post.ownerId.toString() !== session?.user.id) {
      return {
        ok: false,
        status: 403,
        message: 'You are not allowed to delete the post!',
      };
    }

    await post.deleteOne();

    revalidatePath('/');
    return { ok: true, status: 200 };
  } catch (error) {
    throw new Error('Something went wrong. Post not deleted.');
  }
};

export const getHeatMapPostsData = async () => {
  try {
    await connectToMongoDB();

    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    const formatedPostDates = await Post.aggregate([
      {
        $match: { ownerId: new mongoose.Types.ObjectId(session.user.id) },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
    ]);
    return JSON.parse(JSON.stringify(formatedPostDates));
  } catch (error) {
    return [];
  }
};

export const getRecentPosts = async () => {
  try {
    await connectToMongoDB();
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    const posts = await Post.find({ ownerId: session.user.id })
      .select(['_id', 'type', 'title'])
      .limit(10)
      .sort({ createdAt: 'desc' });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    return null;
  }
};
