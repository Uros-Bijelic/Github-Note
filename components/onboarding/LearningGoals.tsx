'use client';

import AddLearningGoal from '../shared/AddLearningGoal';
import { Button } from '../ui/button';

import { useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

interface ILearningGoalsProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const LearningGoals: React.FC<ILearningGoalsProps> = ({ handleChangeStep }) => {
  const { trigger, getValues } = useFormContext();

  const validateAndChangeStep = async () => {
    const validInputs = await trigger('learningGoals');

    if (!validInputs) return;

    const learningGoals = getValues('learningGoals');

    await handleChangeStep(
      { learningGoals, onboardingStep: EOnboardingStep.KNOWLEDGE_LEVEL },
      EOnboardingStep.KNOWLEDGE_LEVEL
    );
  };

  return (
    <article className="flex flex-col gap-6">
      <AddLearningGoal />
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </article>
  );
};

export default LearningGoals;
