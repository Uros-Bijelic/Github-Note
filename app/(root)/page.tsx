import type { HeatMapValue } from '@uiw/react-heat-map';

import { auth } from '@/auth';
import PostItem from '@/components/post/PostItem';
import PostItemBadge from '@/components/post/PostItemBadge';
import Pagination from '@/components/shared/Pagination';
import PostsHeatMap from '@/components/shared/PostsHeatMap';
import { POST_TYPES } from '@/constants';
import { getAllPosts, getHeatMapPostsData } from '@/lib/actions/post-actions';
import type { IPostsResponse } from '@/types/post';
import { EQueryPostType } from '@/types/post-types';
import { parseSearchParams, parseTagsParams } from '@/utils/params';

// ----------------------------------------------------------------

interface IHomePageProps {
  searchParams: Promise<{
    page: string | string[] | undefined;
    type: string | string[] | undefined;
    tag: string | string[] | undefined;
  }>;
}

const HomePage: React.FC<IHomePageProps> = async ({ searchParams }) => {
  const params = await searchParams;

  const page = parseSearchParams(params.page, '1');
  const postType = parseSearchParams(params.type, '') as EQueryPostType;
  const tags = parseTagsParams(params.tag);

  const session = await auth();

  const response: IPostsResponse | undefined = await getAllPosts({
    page: Number(page),
    postType,
    tags,
    itemsPerPage: 3,
  });
  if (response?.status !== 200) {
    throw new Error('Posts not available at the moment!');
  }

  const heatMapPosts: HeatMapValue[] = await getHeatMapPostsData();

  const { posts, totalPages, hasNextPage } = response;

  return (
    <section className="px-5 lg:px-7.5">
      <h1 className="h1-bold mb-2.5 mt-10">Hello {session?.user.name}</h1>
      <p className="p1-regular mb-7.5">
        Time to jot down your latest learnings today!
      </p>
      <div className="mx-auto mb-9 max-w-[800]">
        <PostsHeatMap value={heatMapPosts} />
      </div>
      <div className="flex-between mb-5 gap-4">
        <h2 className="h2-bold">Recent Posts</h2>
        <ul className="flex flex-wrap gap-3.5">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </ul>
      </div>
      <ul className="mb-10 flex flex-col gap-5">
        {posts.length > 0 ? (
          posts.map(({ _id, title, tags, type }) => (
            <PostItem
              key={_id}
              title={title}
              type={type}
              id={_id}
              tags={tags}
            />
          ))
        ) : (
          <h2 className="h2-bold text-center">
            There are no posts to display!
          </h2>
        )}
      </ul>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={Number(page)}
          hasNextPage={hasNextPage}
          hasPrevPage={Number(page) !== 1}
        />
      )}
    </section>
  );
};

export default HomePage;
