'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ITagItemProps {
  title: string;
  isLink?: boolean;
  isFilterItem?: boolean;
}

const TagItem: React.FC<ITagItemProps> = ({
  title,
  isLink = true,
  isFilterItem = false,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const allTags = searchParams.getAll('tag');

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(allTags.includes(title.toLowerCase()));
  }, [allTags, title]);

  const handleUpdateTagParam = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has('tag', tagName)) {
      params.delete('tag', tagName);
    } else {
      params.append('tag', tagName);
    }

    return params.toString();
  };

  return (
    <li
      className={`p3-medium line-clamp-1 flex w-fit cursor-pointer gap-3 rounded-[3px] bg-black-700 px-2 py-0.5 text-center ${isFilterItem ? 'transition-transform hover:translate-x-1' : ''}`}
    >
      {isSelected && isFilterItem && (
        <Image
          src="/assets/icons/check-fill-green.svg"
          width={16}
          height={16}
          alt="Checked"
        />
      )}

      {isLink ? (
        <Link
          href={pathname + '?' + handleUpdateTagParam(title.toLowerCase())}
          className="line-clamp-1"
        >
          {title}
        </Link>
      ) : (
        title
      )}
    </li>
  );
};

export default TagItem;
