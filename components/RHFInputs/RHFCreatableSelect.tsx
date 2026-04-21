import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

export interface ISelectOptions {
  label: string;
  value: string;
}

interface IRHFReactSelectProps {
  name: string;
  label?: string;
  description?: string;
  isMulti?: boolean;
  placeholder?: string;
  options?: ISelectOptions[];
  value?: ISelectOptions[];
}

const DropdownIndicator = () => {
  return (
    <Image
      src="/assets/icons/icn-chevron-down.svg"
      width={16}
      height={16}
      alt="Arrow down"
    />
  );
};

const black700 = '#1D2032';
const black600 = '#2E3757';
const white300 = '#ADB3CC';

const RHFCreatableSelect: React.FC<IRHFReactSelectProps> = ({
  name,
  label,
  description,
  isMulti = true,
  placeholder,
  options,
  value,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CreatableSelect
              {...field}
              noOptionsMessage={() => 'There are no options available'}
              onChange={field.onChange}
              defaultValue={value}
              instanceId={field.name}
              styles={{
                indicatorsContainer: (base) => ({
                  ...base,
                  color: white300,
                  marginRight: '12px',
                  cursor: 'pointer',
                }),
                clearIndicator: (base) => {
                  return {
                    ...base,
                    color: white300,
                  };
                },
                indicatorSeparator: () => ({
                  border: 'none',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: white300,
                  fontSize: '14px',
                }),
                input: (base) => ({
                  ...base,
                  color: white300,
                }),
                control: () => ({
                  display: 'flex',
                  cursor: 'text',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  backgroundColor: black700,
                  '&:focus': {
                    outline: 'none',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: black700,
                  marginTop: 4,
                  display: options && options?.length > 0 ? 'block' : 'none',
                }),
                option: (base, { data, options }) => {
                  const isLastOption = data === options[options.length - 1];
                  return {
                    ...base,
                    backgroundColor: black700,
                    borderBottom: isLastOption ? '' : `1px solid ${black700}`,
                    '&:active': {
                      backgroundColor: black600,
                    },
                    '&:hover': {
                      backgroundColor: black600,
                    },
                  };
                },
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: black600,
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: white300,
                }),
                multiValueRemove: () => ({
                  paddingLeft: '4px',
                  paddingRight: '4px',
                }),
              }}
              options={options}
              placeholder={placeholder}
              components={{ DropdownIndicator }}
              isMulti={isMulti}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-primary" />
        </FormItem>
      )}
    />
  );
};

export default RHFCreatableSelect;
