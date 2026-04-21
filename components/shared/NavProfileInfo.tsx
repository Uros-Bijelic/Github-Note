import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

const NavProfileInfo: React.FC = async () => {
  const session = await auth();

  return (
    <Link href="/profile" className="flex gap-1.5">
      <div
        className={`${!session?.user.image ? 'bg-black-700' : ''} flex-center size-9 rounded-sm`}
      >
        <Image
          src={session?.user.image || '/assets/images/image-preview.svg'}
          width={36}
          height={36}
          alt="Profile Image"
          className={`rounded-lg ${session?.user.image ? 'size-9' : 'size-4.5'}`}
        />
      </div>
      <div>
        <p className="p3-medium text-white-100">{session?.user.name}</p>
        <p className="p4-regular">{session?.user.email}</p>
      </div>
    </Link>
  );
};

export default NavProfileInfo;
