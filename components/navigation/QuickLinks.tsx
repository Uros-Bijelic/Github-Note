'use client';

import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';

import { signOut } from '@/lib/actions/auth';

interface IQuickLinksProps {
  githubUrl: string | undefined;
}

const QuickLinks: React.FC<IQuickLinksProps> = ({ githubUrl }) => {
  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-5 text-[10px] uppercase">Quick Links</p>
      <Link
        href={githubUrl || '/'}
        // href={user?.githubLink || '/'}
        className="p3-medium mb-5 flex items-center gap-3 text-white-500"
      >
        <Image
          src="/assets/images/github-outline.svg"
          width={16}
          height={16}
          alt="GitHub"
        />
        GitHub
      </Link>
      <Button
        className="p3-medium flex w-auto items-center justify-start gap-3 bg-transparent p-0 text-white-500! shadow-none hover:bg-transparent"
        onClick={() => signOut({ redirectTo: '/login' })}
      >
        <Image
          src="/assets/icons/logout.svg"
          width={16}
          height={16}
          alt="Logout"
        />
        Logout
      </Button>
    </div>
  );
};

export default QuickLinks;
