import Image from 'next/image';
import Link from 'next/link';

import { EPostType } from '@/types/post-types';

interface ILinkPostItemProps {
  id: string;
  type: EPostType;
  title: string;
}

const getImageSrc = (postType: EPostType) => {
  switch (postType) {
    case EPostType.COMPONENT:
      return '/assets/images/icn-computer.svg';
    case EPostType.KNOWLEDGE:
      return '/assets/images/icn-message-circle.svg';
    case EPostType.WORKFLOW:
      return '/assets/images/icn-list-number.svg';
    default:
      return '/assets/images/icn-computer.svg';
  }
};

const LinkPostItem: React.FC<ILinkPostItemProps> = ({ type, title, id }) => {
  const imageSrc = getImageSrc(type);

  return (
    <li>
      <Link
        href={'/post/' + id}
        className="p3-medium flex cursor-pointer gap-3 transition hover:-translate-y-1 hover:text-primary-500"
      >
        <Image
          src={imageSrc}
          width={16}
          height={16}
          alt={title}
          className="shrink-0"
        />
        <span className="line-clamp-1">{title}</span>
      </Link>
    </li>
  );
};

export default LinkPostItem;
