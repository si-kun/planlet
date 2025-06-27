import React, { useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface TaskDateProps {
  label: string;
  value? : string
  onChange?: (value: string) => void;
}

const TaskDate = ({ label, value, onChange }: TaskDateProps) => {

  const [open, setOpen] = useState(false)

  const dateValue = value ? new Date(value) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if(date && onChange) {
      const timeInput = document.getElementById(`time-${label}`) as HTMLInputElement;
      const timeValue = timeInput?.value || "00:00:00";

      const [hours, minutes, seconds] = timeValue.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours),parseInt(minutes),parseInt(seconds))

      onChange(newDate.toISOString());
    }
    setOpen(false);
  }

  const handleTimeChange = (timeValue: string) => {
    if(dateValue && onChange) {
      const [hours, minutes, seconds] = timeValue.split(":");
      const newDate = new Date(dateValue);
      newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
      onChange(newDate.toISOString());
    }
  }

  const getDisplayText = () => {
    if(dateValue) {
      return dateValue.toLocaleDateString();
    }

    if(label === "開始日") {
      return new Date().toLocaleDateString();
    }

    return "日付を選択"
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="date-picker" className="px-1 whitespace-nowrap">
        {label}:
      </Label>
      <div className="flex w-full items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="flex-1">
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {getDisplayText()}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-3 flex-1">
        <Input
          type="time"
          id={`time-${label}`}
          step="1"
          value={dateValue ? dateValue.toTimeString().slice(0,8) : "00:00:00"}
          onChange={(e) => handleTimeChange(e.target.value)}
          defaultValue="10:30:00"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default TaskDate;
