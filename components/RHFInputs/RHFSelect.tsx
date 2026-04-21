import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IRHFSelectProps {
  name: string;
  label?: string;
  description?: string;
  children: React.ReactNode;
}

const RHFSelect: React.FC<IRHFSelectProps> = ({
  name,
  label,
  description,
  children,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface ISelectOptionWithIconProps {
  value: string;
  imgUrl: string;
  label: string;
}

// ----------------------------------------------------------------

export const SelectOptionWithIcon: React.FC<ISelectOptionWithIconProps> = ({
  imgUrl,
  label,
  value,
}) => {
  return (
    <SelectItem value={value}>
      <div className="flex gap-1.5">
        <Image src={imgUrl} alt={label} width={16} height={16} />
        {label}
      </div>
    </SelectItem>
  );
};

export default RHFSelect;
