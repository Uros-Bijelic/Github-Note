import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

const AddKnowledgeLevel = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'knowledgeLevel',
  });
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <p className="p3-medium">Knowledgde Level</p>
      <ul className="mb-1.5 flex flex-col gap-2">
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <AddKnowledgeLevelItem
              key={field.id}
              index={index}
              onRemove={remove}
            />
          ))
        ) : (
          <li
            className={`my-2 rounded px-3 text-center ${errors.knowledgeLevel ? 'text-red-primary' : ''}`}
          >
            {errors.knowledgeLevel
              ? errors.knowledgeLevel.message?.toString()
              : 'Start adding your expertise...'}
          </li>
        )}
      </ul>
      <Button
        type="button"
        onClick={() => append('')}
        variant="secondary"
        className="mb-2"
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          width={14}
          height={14}
          alt="Add"
        />
        Add knowledge checkmark
      </Button>
    </div>
  );
};

export default AddKnowledgeLevel;

interface IAddKnowledgeLevelItemProps {
  index: number;
  // eslint-disable-next-line no-unused-vars
  onRemove: (index: number) => void;
}

const AddKnowledgeLevelItem: React.FC<IAddKnowledgeLevelItemProps> = ({
  index,
  onRemove,
}) => {
  return (
    <li className="flex-between rounded bg-black-700 px-3">
      <div className="flex flex-1 items-center">
        <Image
          src="/assets/images/icn-check-square.svg"
          alt="Checked"
          width={20}
          height={20}
          className="mr-2"
        />
        <RHFInput
          name={`knowledgeLevel.${index}`}
          placeholder="Enter your expertise level"
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
