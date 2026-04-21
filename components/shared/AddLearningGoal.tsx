import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

const AddLearningGoal = () => {
  const { fields, append, remove } = useFieldArray({ name: 'learningGoals' });
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <p className="p3-medium">Learning goals</p>
      <ul className="mb-1.5 flex flex-col gap-2">
        {fields?.length > 0 ? (
          fields.map((field, index) => (
            <AddLearningGoalItem
              key={field.id}
              index={index}
              onRemove={remove}
            />
          ))
        ) : (
          <li
            className={`my-2 rounded px-3 py-2 text-center ${errors.learningGoals ? 'text-red-primary' : ''}`}
          >
            {errors.learningGoals
              ? errors.learningGoals?.message?.toString()
              : 'Add your learning goals...'}
          </li>
        )}
      </ul>
      <Button
        type="button"
        onClick={() => append({ isChecked: false, goal: '' })}
        variant="secondary"
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          alt="add"
          width={14}
          height={14}
        />
        Add goal checkbox
      </Button>
    </div>
  );
};

export default AddLearningGoal;

interface IAddLearningGoalItemProps {
  index: number;
  // eslint-disable-next-line no-unused-vars
  onRemove: (index: number) => void;
}

const AddLearningGoalItem: React.FC<IAddLearningGoalItemProps> = ({
  index,
  onRemove,
}) => {
  return (
    <li className="flex-between rounded bg-black-700 px-3">
      <div className="flex flex-1 items-center">
        <RHFCheckbox
          name={`learningGoals.${index}.isChecked`}
          className="mr-0 pr-0"
        />
        <RHFInput
          name={`learningGoals.${index}.goal`}
          placeholder="Enter a learning goal"
          className="pl-0"
        />
      </div>
      <CloseIcon
        className="cursor-pointer text-white-500"
        onClick={() => onRemove(index)}
      />
    </li>
  );
};
