import ExplorePostsList from "@/components/post/ExplorePostsList";
import PostItemBadge from "@/components/post/PostItemBadge";
import { POST_TYPES } from "@/constants";
import { getAllPosts } from "@/lib/actions/post-actions";
import { IPostsResponse } from "@/types/post";
import { EQueryPostType } from "@/types/post-types";
import { parseSearchParams } from "@/utils/params";

// ----------------------------------------------------------------

interface IExplorePageProps {
  searchParams: {
    page: string | string[] | undefined;
    type: string | string[] | undefined;
  };
}

const ExplorePage: React.FC<IExplorePageProps> = async ({ searchParams }) => {
  const params = await searchParams;

  const page = Number(parseSearchParams(params.page, "1"));
  const postType = parseSearchParams(params.type, "") as EQueryPostType;

  const response: IPostsResponse | undefined = await getAllPosts({
    page: Number(page),
    postType,
    itemsPerPage: 10,
  });

  if (!response) {
    throw new Error("Something went wrong. Can't show posts at the moment. ");
  }

  return (
    <section className="px-7.5 py-10">
      <div className="flex-between mb-6">
        <h2 className="h2-bold">Recent Posts</h2>
        <ul className="flex flex-wrap gap-3.5">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </ul>
      </div>
      <ExplorePostsList
        initialPosts={response.posts}
        currentPage={page}
        initHasNextPage={response.hasNextPage}
        postType={postType}
      />
    </section>
  );
};

export default ExplorePage;
