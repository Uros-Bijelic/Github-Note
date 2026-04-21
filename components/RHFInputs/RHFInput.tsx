import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input, type InputProps } from '../ui/input';

import { useFormContext } from 'react-hook-form';

interface IRHFInputProps extends InputProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFInput: React.FC<IRHFInputProps> = ({
  name,
  description,
  label,
  type = 'text',
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <Input type={type} {...field} {...rest} />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-primary" />
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
