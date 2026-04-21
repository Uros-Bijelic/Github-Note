'use client';

import RHFInput from '../RHFInputs/RHFInput';
import ProfileImageUpload from '../shared/ProfileImageUpload';
import { Button } from '../ui/button';

import { useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

interface IBasicInformationProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const BasicInformation: React.FC<IBasicInformationProps> = ({
  handleChangeStep,
}) => {
  const { trigger, getValues } = useFormContext();

  const validateAndChangeStep = async () => {
    const validInputs = await trigger([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    if (!validInputs) return;

    const [fullName, portfolioUrl, avatarImg] = getValues([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    await handleChangeStep(
      {
        fullName,
        portfolioUrl,
        avatarImg,
        onboardingStep: EOnboardingStep.LEARNING_GOALS,
      },
      EOnboardingStep.LEARNING_GOALS
    );
  };

  return (
    <article className="flex flex-col gap-6">
      <ProfileImageUpload name="avatarImg" />
      <RHFInput label="Name" name="fullName" placeholder="Edit your Name" />
      <RHFInput
        label="Portfolio"
        name="portfolioUrl"
        placeholder="Portfolio link"
      />
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </article>
  );
};

export default BasicInformation;
