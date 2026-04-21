import { Checkbox } from '../ui/checkbox';

import { CheckboxProps } from '@radix-ui/react-checkbox';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface IRHFCheckboxProps extends CheckboxProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFCheckbox: React.FC<IRHFCheckboxProps> = ({
  name,
  description,
  label,
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
              {...rest}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel className="text-white-100">{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

export default RHFCheckbox;
