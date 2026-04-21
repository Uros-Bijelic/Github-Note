import RHFInput from './RHFInput';

import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray } from 'react-hook-form';

const RHFLearningResources: React.FC = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'learningResources',
  });

  return (
    <>
      <p className="text-sm uppercase text-white-500">Resources & Links</p>
      <ul>
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <li key={field.id} className="mb-3.5 flex items-center gap-2">
              <RHFInput
                name={`learningResources.${index}.label`}
                placeholder="Label"
              />
              <RHFInput
                name={`learningResources.${index}.link`}
                placeholder="Resource Link"
              />
              <div className="flex rounded bg-black-700 p-2.5">
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => remove(index)}
                />
              </div>
            </li>
          ))
        ) : (
          <li className="mb-3.5 gap-2 text-center">
            Start adding new resources...
          </li>
        )}
      </ul>

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ label: '', link: '' })}
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          width={16}
          height={16}
          alt="New resource"
        />
        <span className="text-xs text-white-100">New Resource</span>
      </Button>
    </>
  );
};

export default RHFLearningResources;
