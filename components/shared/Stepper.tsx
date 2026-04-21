import Image from 'next/image';

import { cn } from '@/lib/utils';

interface IStepperStyleDetails {
  className: string;
  icon: string;
}

interface IStepperStyles {
  default: IStepperStyleDetails;
  current: IStepperStyleDetails;
  completed: IStepperStyleDetails;
}

const stepperStyles: IStepperStyles = {
  default: {
    className: 'bg-black-600',
    icon: 'dot',
  },
  current: {
    className: 'bg-primary-500 ring-8 ring-black-600',
    icon: 'dot',
  },
  completed: {
    className: 'bg-primary-500',
    icon: 'check',
  },
};

interface IStepperProps {
  currentStep: number;
}

const Stepper: React.FC<IStepperProps> = ({ currentStep }) => {
  if (currentStep > 4) return null;
  const completedLineWidth = Math.round(((currentStep - 1) / 3) * 100);

  return (
    <div className="relative z-30 flex  justify-between">
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-black-600">
        <div
          className="h-1 bg-primary-500"
          style={{ width: `${completedLineWidth}%` }}
        />
      </div>
      {[1, 2, 3, 4].map((step) => {
        switch (true) {
          case step === currentStep:
            return <Step key={step} currentStyle={stepperStyles.current} />;
          case step < currentStep:
            return <Step key={step} currentStyle={stepperStyles.completed} />;
          case step > currentStep:
            return <Step key={step} currentStyle={stepperStyles.default} />;
          default:
            return <Step key={step} currentStyle={stepperStyles.default} />;
        }
      })}
    </div>
  );
};

interface IStep {
  currentStyle: IStepperStyleDetails;
}

const Step: React.FC<IStep> = ({ currentStyle }) => {
  return (
    <div
      className={cn(
        'flex-center z-10 min-w-8 rounded-[6px]',
        currentStyle.className
      )}
    >
      <Image
        src={`/assets/images/${currentStyle.icon}.svg`}
        alt="Finished Step"
        width={32}
        height={32}
      />
    </div>
  );
};

export default Stepper;
