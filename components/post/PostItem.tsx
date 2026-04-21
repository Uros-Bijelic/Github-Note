'use client';

import PostItemBadge from './PostItemBadge';

import TagItem from '../shared/TagItem';

import { useRouter } from 'next/navigation';

import { EPostType } from '@/types/post-types';
import type { ITag } from '@/types/tag';

interface IPostItemProps {
  id: string;
  type: EPostType;
  title: string;
  tags: ITag[];
}

const PostItem: React.FC<IPostItemProps> = ({ title, type, tags, id }) => {
  const router = useRouter();

  return (
    <li
      className="cursor-pointer rounded-lg bg-black-800 px-9 py-6"
      onClick={() => router.push('/post/' + id)}
    >
      <PostItemBadge postType={type} />
      <h1 className="h1-medium my-4 line-clamp-2 text-white-100">{title}</h1>
      <ul className="flex flex-wrap gap-2.5">
        {tags.length
          ? tags.map((tag) => (
              <TagItem key={tag.title} title={tag.title} isLink={false} />
            ))
          : null}
      </ul>
    </li>
  );
};

export default PostItem;
