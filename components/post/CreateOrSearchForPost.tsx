'use client';

import SearchCommandDialog from '../shared/SearchCommandDialog';
import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CreateOrSearchForPost: React.FC = () => {
  const pathname = usePathname();

  return (
    <div>
      {pathname !== '/post/create' && (
        <Link href="/post/create" className="rounded-md text-white-100">
          <Button variant="gradient" className="mb-4 rounded-[6px]">
            <Image
              src="/assets/icons/plus-bg-white.svg"
              width={14}
              height={14}
              alt="Add"
            />
            <p className="p4-medium text-white-100!">Create Post</p>
          </Button>
        </Link>
      )}

      <SearchCommandDialog />
    </div>
  );
};

export default CreateOrSearchForPost;
