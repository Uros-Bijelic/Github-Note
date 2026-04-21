'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { EPostType, EQueryPostType } from '@/types/post-types';
interface IPostItemBadgeProps {
  postType: EPostType;
}

const generateBadge = (postType: EPostType) => {
  let styles = '';
  let imgUrl = '';
  let label = '';
  let postTypeQuery = '';

  switch (postType) {
    case EPostType.COMPONENT:
      styles = 'text-purple-500 bg-[#42BBFF1A]';
      imgUrl = '/assets/icons/icn-computer.svg';
      label = 'Component';
      postTypeQuery = EQueryPostType.COMPONENT;
      break;
    case EPostType.KNOWLEDGE:
      styles = 'text-green-500 bg-[#42FF771A]';
      imgUrl = '/assets/icons/icn-message-circle.svg';
      label = 'Knowledge';
      postTypeQuery = EQueryPostType.KNOWLEDGE;
      break;
    case EPostType.WORKFLOW:
      styles = 'text-primary-500 bg-[#9542FF1A]';
      imgUrl = '/assets/icons/icn-list-number.svg';
      label = 'WorkFlow';
      postTypeQuery = EQueryPostType.WORKFLOW;
      break;
    default:
      styles = 'text-purple-500 bg-[#42BBFF1A]';
      imgUrl = '/assets/icons/icn-computer.svg';
      label = 'Component';
      postTypeQuery = EQueryPostType.COMPONENT;
  }

  return {
    styles,
    imgUrl,
    label,
    postTypeQuery,
  };
};

const PostItemBadge: React.FC<IPostItemBadgeProps> = ({ postType }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePostTypeParam = (value: EQueryPostType) => {
    const params = new URLSearchParams(searchParams.toString());

    const existingPostType = params.get('type');

    if (existingPostType === value) {
      params.delete('type');
    } else {
      params.set('type', value);
    }
    params.set('page', '1');

    return params.toString();
  };

  const { styles, imgUrl, label, postTypeQuery } = generateBadge(postType);

  return (
    <Link
      href={
        pathname + '?' + updatePostTypeParam(postTypeQuery as EQueryPostType)
      }
      className={`${styles} flex max-w-27 cursor-pointer gap-1 rounded-[3px] py-0.5 pl-1 pr-2 text-sm`}
    >
      <Image
        style={{ position: 'relative' }}
        src={imgUrl}
        alt={label}
        width={16}
        height={16}
      />
      {label}
    </Link>
  );
};

export default PostItemBadge;
