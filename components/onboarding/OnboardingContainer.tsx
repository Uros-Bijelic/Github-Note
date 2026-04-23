'use client';

import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import BasicInformation from '@/components/onboarding/BasicInformation';
import KnowledgeLevel from '@/components/onboarding/KnowledgeLevel';
import LearningGoals from '@/components/onboarding/LearningGoals';
import ScheduleAndAvailability from '@/components/onboarding/ScheduleAndAvailability';
import Stepper from '@/components/shared/Stepper';
import { Form } from '@/components/ui/form';
import {
  updateUserOnboarding,
  updateUserOnboardingStep,
} from '@/lib/actions/user-actions';
import {
  userOnboardingSchema,
  type IUserOnboarding,
} from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';
import type { IUser } from '@/types/user';

const generateTitleBasedOnStep = (step: EOnboardingStep) => {
  switch (step) {
    case EOnboardingStep.BASIC_INFORMATION:
      return 'Basic Information';
    case EOnboardingStep.LEARNING_GOALS:
      return 'Add your learning goals';
    case EOnboardingStep.KNOWLEDGE_LEVEL:
      return 'Add your knowledge level';
    case EOnboardingStep.SCHEDULE_AND_AVAILABILITY:
      return 'Schedule & availability';
    default:
      return 'Basic Information';
  }
};

interface IOnboardingContainer {
  user: IUser;
}

const OnboardingContainer: React.FC<IOnboardingContainer> = ({ user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState<EOnboardingStep>(
    user?.onboardingStep || EOnboardingStep.BASIC_INFORMATION
  );

  const form = useForm<IUserOnboarding>({
    resolver: zodResolver(userOnboardingSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      portfolioUrl: user?.portfolioUrl || '',
      avatarImg: user?.avatarImg || '',
      learningGoals: user?.learningGoals || [],
      knowledgeLevel: user?.knowledgeLevel || [],
      techStack:
        user?.techStack?.map((item) => ({
          label: item,
          value: item,
        })) || [],
      startDate: user?.startDate ? new Date(user?.startDate) : undefined,
      endDate: user?.endDate ? new Date(user?.endDate) : undefined,
      isAvailable: user?.isAvailable || false,
      onboardingStep: user?.onboardingStep || step,
    },
  });

  const handleChangeStep = async (
    data: Partial<IUserOnboarding>,
    newStep: EOnboardingStep
  ) => {
    await updateUserOnboardingStep(data);
    setStep(newStep);
  };

  const onSubmit: SubmitHandler<IUserOnboarding> = async (data) => {
    data.onboardingStep = EOnboardingStep.FINISHED_ONBOARDING;

    try {
      const response = await updateUserOnboarding(data);
      if (response?.ok && response?.status === 200) {
        toast({
          variant: 'success',
          title: 'Onboarding finished successfully!',
        });
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'error',
          title: error.message,
        });
      }
    }
  };

  return (
    <div className="my-7.5 px-5 lg:px-7.5">
      <div className="m-auto max-w-150">
        <Image
          src="/assets/images/Logo.svg"
          alt="Logo"
          width={156}
          height={36}
          className="m-auto mb-16"
        />
        <div className="m-auto rounded-xl bg-black-800 px-5 py-8 sm:px-8">
          <div className="mb-6">
            <Stepper currentStep={step} />
          </div>
          <h2 className="h2-bold mb-6">{generateTitleBasedOnStep(step)}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === EOnboardingStep.BASIC_INFORMATION && (
                <BasicInformation handleChangeStep={handleChangeStep} />
              )}
              {step === EOnboardingStep.LEARNING_GOALS && (
                <LearningGoals handleChangeStep={handleChangeStep} />
              )}
              {step === EOnboardingStep.KNOWLEDGE_LEVEL && (
                <KnowledgeLevel handleChangeStep={handleChangeStep} />
              )}
              {step === EOnboardingStep.SCHEDULE_AND_AVAILABILITY && (
                <ScheduleAndAvailability />
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;
