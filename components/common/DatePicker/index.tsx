'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface IDatePickerProps {
  children: React.ReactNode;
  date?: Date;
  onChange: (date?: Date) => void;
  labelClassName?: string;
  open?: boolean;
}

function DatePicker({
  children,
  date,
  onChange,
  labelClassName,
}: IDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className={labelClassName}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => onChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(DatePicker);
