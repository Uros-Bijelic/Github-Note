import { auth } from "@/auth";
import CreateOrUpdatePost from "@/components/post/CreateOrUpdatePost";
import { getPostById } from "@/lib/actions/post-actions";
import { getTags } from "@/lib/actions/tag-actions";
import { IPost } from "@/types/post";
import type { ITag } from "@/types/tag";

// ----------------------------------------------------------------
interface IEditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditPostPage: React.FC<IEditPostPageProps> = async ({ params }) => {
  const postId = (await params).id;

  const session = await auth();

  if (!session) {
    throw new Error(
      "Something went wrong. User data is not available at this moment!"
    );
  }

  const tags: ITag[] = (await getTags(session.user.id)) || [];

  const post: IPost | undefined = await getPostById(postId);

  if (!post || !tags)
    throw new Error(
      "Something went wrong. Post details are not available at this moment!"
    );

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return <CreateOrUpdatePost tags={modifiedTags} post={post} />;
};

export default EditPostPage;
