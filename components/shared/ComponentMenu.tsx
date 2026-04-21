import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface IComponentMenuProps {
  postId: string;
  onDeletePost: () => void;
}

const ComponentMenu: React.FC<IComponentMenuProps> = ({
  postId,
  onDeletePost,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/assets/icons/icn-more-vertical.svg"
          alt="Menu"
          width={24}
          height={24}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/post/${postId}/edit`}>
          <DropdownMenuItem className="gap-2">
            <Image
              src="/assets/icons/icn-edit-white.svg"
              alt="Edit"
              width={14}
              height={14}
            />
            <DropdownMenuLabel className="text-sm text-white-100">
              Upadete post
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="gap-2" onClick={onDeletePost}>
          <Image
            src="/assets/icons/icn-trash.svg"
            alt="Delete"
            width={14}
            height={14}
          />
          <DropdownMenuLabel className="text-sm text-white-100">
            Delete Post
          </DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComponentMenu;
