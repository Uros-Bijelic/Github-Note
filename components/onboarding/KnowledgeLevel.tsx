'use client';

import RHFCreatableSelect from '../RHFInputs/RHFCreatableSelect';
import AddKnowledgeLevel from '../shared/AddKnowledgeLevel';
import { Button } from '../ui/button';

import { useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

interface IKnowledgeLevelProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const KnowledgeLevel: React.FC<IKnowledgeLevelProps> = ({
  handleChangeStep,
}) => {
  const { trigger, getValues } = useFormContext();

  const validateAndChangeStep = async () => {
    const validInputs = await trigger(['knowledgeLevel', 'techStack']);

    if (!validInputs) return;

    const [knowledgeLevel, techStack] = getValues([
      'knowledgeLevel',
      'techStack',
    ]);

    handleChangeStep(
      {
        knowledgeLevel,
        techStack,
        onboardingStep: EOnboardingStep.SCHEDULE_AND_AVAILABILITY,
      },
      EOnboardingStep.SCHEDULE_AND_AVAILABILITY
    );
  };

  return (
    <article className="flex flex-col gap-2">
      <AddKnowledgeLevel />
      <RHFCreatableSelect
        name="techStack"
        label="Tech Stack"
        placeholder="Please add your Tech Stack..."
      />
      <Button type="button" onClick={validateAndChangeStep} className="mt-4">
        Next
      </Button>
    </article>
  );
};

export default KnowledgeLevel;
