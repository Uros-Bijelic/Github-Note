'use server';

import { connectToMongoDB } from '../database/mongodb';

import { auth } from '@/auth';
import Tag from '@/models/tag';

export const getTags = async (ownerId: string, limit = 16) => {
  try {
    await connectToMongoDB();

    const tags = await Tag.find({ ownerId }).limit(limit);

    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    console.log('Error fetching tags', error);
    return [];
  }
};

// export const getPopularTags = async () => {
//   try {
//     const session = await auth();
//     if (!session) return;

//     const popularTags = await Post.aggregate([
//       // { $match: { ownerId: session.user.id } },
//       { $unwind: '$tags' },
//       // { $count: 'tags' },
//       { $group: { _id: '$tags', totalCount: { $sum: 1 } } },
//     ]);

//     const popularTags = await Post.aggregate()
//       .project({
//         _id: 0,
//         tags: 1,
//       })
//       .group({ _id: '$tags', totalCount: { $sum: 1 } });

//     const popularTags = await Post.find().select('tags').group();

//   } catch (error) {
//     console.log('Error aggregation', error);
//   }
// };

export const getRecentTags = async () => {
  try {
    const session = await auth();
    if (!session) throw new Error('User data is not available!');

    const recentTags = await Tag.find({ ownerId: session.user.id })
      .sort({
        timestamp: 'desc',
      })
      .limit(12)
      .select(['_id', 'title'])
      .lean();

    return JSON.parse(JSON.stringify(recentTags));
  } catch (error) {
    console.log('Error fetching recently created timestamps.', error);
    return [];
  }
};
