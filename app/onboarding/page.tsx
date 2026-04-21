import { auth } from "@/auth";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import { getUserById } from "@/lib/actions/user-actions";

// ----------------------------------------------------------------

const OnboardingPage = async () => {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("User data is not available at this moment!");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    throw new Error("User data is not available at this moment!");
  }

  return <OnboardingContainer user={user} />;
};

export default OnboardingPage;
