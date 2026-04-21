import { auth } from "@/auth";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MobileNav from "@/components/navigation/MobileNav";
import SocialMediaLinks from "@/components/shared/SocialMediaLinks";
import { getUserById } from "@/lib/actions/user-actions";
import type { IUser } from "@/types/user";

// ----------------------------------------------------------------

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = async ({ children }) => {
  const session = await auth();
  if (!session) throw new Error("Session not available");

  const user: IUser = await getUserById(session?.user.id);
  if (!user) throw new Error("User not available");

  return (
    <div className="mx-auto flex h-full max-w-360">
      <LeftSidebar />
      <div className="flex flex-1 flex-col">
        <div className="mb-7.5 md:hidden">
          <MobileNav />
        </div>
        {children}
      </div>
      <RightSidebar>
        <SocialMediaLinks
          githubLink={user.githubLink}
          githubName={user.githubName}
          linkedinLink={user.linkedinLink}
          linkedinName={user.linkedinName}
          twitterLink={user.twitterLink}
          twitterName={user.twitterName}
          instagramLink={user.instagramLink}
          instagramName={user.instagramName}
          facebookLink={user.facebookLink}
          facebookName={user.facebookName}
          dribbbleLink={user.dribbbleLink}
          dribbbleName={user.dribbbleName}
        />
      </RightSidebar>
    </div>
  );
};

export default Layout;
