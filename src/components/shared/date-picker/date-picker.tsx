"use client";

import { Button } from "@/components/shared/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/Popover";
import { cn } from "@/lib/utils";
import { Calendar, CalendarProps } from "@/components/shared/Calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

type Selected = Date | undefined;

type DatePickerProps = Pick<CalendarProps, "disabled"> & {
  selected?: Selected;
  onSelect?: (date: Selected) => void;
  placeholder?: string;
};

export default function DatePicker({
  selected,
  onSelect,
  placeholder = "Pick a date",
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Selected>(selected);

  const handleSelect = (newDate: Selected) => {
    setDate(newDate);
    onSelect?.(newDate);
  };

  // Sync với prop selected nếu có
  React.useEffect(() => {
    setDate(selected);
  }, [selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleSelect} autoFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}
