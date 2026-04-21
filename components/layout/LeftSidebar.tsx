import QuickLinks from '../navigation/QuickLinks';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import LinkPostItem from '../post/LinkPostItem';
import NavProfileInfo from '../shared/NavProfileInfo';

import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';
import { getRecentPosts } from '@/lib/actions/post-actions';
import { getUserById } from '@/lib/actions/user-actions';
import type { IRecentPost } from '@/types/post';
import type { IUser } from '@/types/user';

const LeftSidebar = async () => {
  const recentPosts: IRecentPost[] | undefined = await getRecentPosts();
  const session = await auth();
  const user: IUser | undefined =
    session?.user && (await getUserById(session?.user.id));

  return (
    <aside className="flex min-h-screen w-72.5 min-w-72.5 flex-col border-r-[1.5px] border-r-gray-border bg-black-800 px-7 max-md:hidden">
      <Link href="/">
        <Image
          src="/assets/images/Logo.svg"
          alt="Github Note"
          width={102}
          height={24}
          className="mb-12 mt-10"
        />
      </Link>
      <div className="flex flex-col gap-6">
        <div className="xl:hidden">
          <NavProfileInfo />
        </div>
        <CreateOrSearchForPost />
        {recentPosts && recentPosts?.length > 0 ? (
          <div className="flex flex-col gap-5 border-y-[0.68px] border-white-500 py-6">
            <p className="text-[10px] uppercase">Posts</p>
            <ul className="flex flex-col gap-5 ">
              {recentPosts?.map(({ _id, title, type }) => (
                <LinkPostItem key={_id} id={_id} title={title} type={type} />
              ))}
            </ul>
          </div>
        ) : null}

        <QuickLinks githubUrl={user?.githubLink} />
      </div>
    </aside>
  );
};

export default LeftSidebar;
