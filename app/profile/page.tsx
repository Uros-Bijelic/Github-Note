import type { HeatMapValue } from "@uiw/react-heat-map";

import { auth } from "@/auth";
import ProfileHome from "@/components/profile/ProfileHome";
import { getHeatMapPostsData } from "@/lib/actions/post-actions";
import { getUserById } from "@/lib/actions/user-actions";
import type { IUser } from "@/types/user";

// ----------------------------------------------------------------

const ProfilePage: React.FC = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Session not available!");
  }

  const user: IUser = await getUserById(session.user.id);
  if (!user) {
    throw new Error("User not found!");
  }

  const heatmapData: HeatMapValue[] = await getHeatMapPostsData();

  return <ProfileHome user={user} heatMapData={heatmapData} />;
};

export default ProfilePage;
