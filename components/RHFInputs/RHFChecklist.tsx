import RHFInput from './RHFInput';

import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface IRHFChecklistProps {
  noContentMessage: string;
  placeholder: string;
  title: string;
}

const RHFChecklist: React.FC<IRHFChecklistProps> = ({
  title,
  placeholder,
  noContentMessage,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'checklist',
  });

  return (
    <div>
      <p className="mb-2 text-sm">{title}</p>
      <ul className="mb-3.5">
        {fields.length ? (
          fields.map((field, index) => {
            return (
              <li
                key={field.id}
                className="flex-between my-1 rounded bg-black-700 px-3"
              >
                <div className="flex flex-1 items-center">
                  <Image
                    src="/assets/icons/icn-check-square.svg"
                    alt="Checked"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <RHFInput
                    name={`checklist.${index}`}
                    placeholder={placeholder}
                    className="pl-0"
                  />
                </div>
                <CloseIcon
                  className="size-[20px] cursor-pointer text-white-500"
                  onClick={() => remove(index)}
                />
              </li>
            );
          })
        ) : (
          <li className="my-2 rounded  px-3 py-2 text-center">
            {errors.checklist
              ? errors.checklist.message?.toString()
              : noContentMessage}
          </li>
        )}
      </ul>
      <Button
        onClick={() => append('')}
        variant="secondary"
        type="button"
        className="gap-2"
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          width={16}
          height={16}
          alt="Add"
        />
        <span className="text-xs text-white-100">Add checkmark</span>
      </Button>
    </div>
  );
};

export default RHFChecklist;
