'use client';

import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFDatePicker from '../RHFInputs/RHFDatePicker';
import { Button } from '../ui/button';

import { useFormContext, useWatch } from 'react-hook-form';

const ScheduleAndAvailability: React.FC = () => {
  const { getValues } = useFormContext();
  useWatch({ name: 'startDate' });
  const startDate = getValues('startDate');
  useWatch({ name: 'endDate' });
  const endDate = getValues('endDate');

  return (
    <article>
      <RHFCheckbox
        name="isAvailable"
        label="Are you available for a new project?"
      />
      <div className="mb-6 mt-8 flex flex-wrap gap-6">
        <div className="flex-1">
          <RHFDatePicker
            name="startDate"
            label="Start Date & Time"
            description="The time is in your local timezone"
            className="flex-1"
            disableDateFn={(date) => date > endDate || date < new Date()}
          />
        </div>
        <div className="flex-1">
          <RHFDatePicker
            name="endDate"
            label="End Date & Time"
            description="The time is in your local timezone"
            disableDateFn={(date) => date < startDate || date < new Date()}
            className="flex-1"
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </article>
  );
};

export default ScheduleAndAvailability;
