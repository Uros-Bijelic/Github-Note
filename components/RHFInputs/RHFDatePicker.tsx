'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type IRHFDatePickerProps = CalendarProps & {
  name: string;
  label: string;
  buttonText?: string;
  description?: string;
  // eslint-disable-next-line no-unused-vars
  disableDateFn?: (date: Date) => boolean;
};

const RHFDatePicker: React.FC<IRHFDatePickerProps> = ({
  name,
  label = '',
  buttonText = 'Select date & time',
  description = '',
  disableDateFn,
}) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col items-start">
          {label && <FormLabel className="p3-medium">{label}</FormLabel>}
          <Popover open={isOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  onClick={() => setIsOpen((prevOpen) => !prevOpen)}
                  variant="secondary"
                  className={cn(
                    'bg-black-700 justify-start',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {/* <CalendarIcon className="size-4 opacity-50" /> */}
                  <Image
                    src="/assets/icons/icn-calendar.svg"
                    alt="Calendar"
                    width={16}
                    height={16}
                  />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <p className="p3-regular">{buttonText}</p>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-black-900 p-0" align="start">
              <Calendar
                mode="single"
                showOutsideDays={false}
                selected={field.value}
                onSelect={(day) => {
                  field.onChange(day);
                  setIsOpen(false);
                }}
                disabled={disableDateFn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="p4-regular">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-red-primary" />
        </FormItem>
      )}
    />
  );
};

export default RHFDatePicker;
