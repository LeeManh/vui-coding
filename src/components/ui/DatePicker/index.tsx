import React from "react";
import { Calendar } from "../Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import { ChevronDownIcon } from "lucide-react";

export const DatePicker = ({ ...props }: React.ComponentProps<typeof Calendar>) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="justify-between font-normal">
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
