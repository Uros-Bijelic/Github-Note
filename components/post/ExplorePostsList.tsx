'use client';

import PostItem from './PostItem';

import LoadingSpinner from '../shared/LoadingSpinner';

import { useFetchPosts } from '@/hooks/use-fetch-posts';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import type { IPost } from '@/types/post';
import { EQueryPostType } from '@/types/post-types';

interface IExplorePostsListProps {
  initialPosts: IPost[];
  currentPage: number;
  initHasNextPage: boolean;
  postType: EQueryPostType;
}

const ExplorePostsList: React.FC<IExplorePostsListProps> = ({
  initialPosts,
  currentPage,
  initHasNextPage,
  postType,
}) => {
  const { hasNextPage, isLoading, posts, setPage } = useFetchPosts({
    initialPosts,
    currentPage,
    initHasNextPage,
    postType,
  });

  const lastItemRef = useInfiniteScroll({
    hasNextPage,
    postsCount: posts.length,
    setPage,
  });

  return (
    <>
      <ul className="grid grid-cols-2 gap-4.5">
        {posts.map(({ _id, title, tags, type }) => (
          <PostItem key={_id} id={_id} title={title} tags={tags} type={type} />
        ))}
        <li ref={lastItemRef} />
      </ul>
      {posts.length === 0 && (
        <h2 className="h2-bold text-center">There are no posts to display!</h2>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ExplorePostsList;
