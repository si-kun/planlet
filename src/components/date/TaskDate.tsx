import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { ScheduleType } from "@/types/form";


interface TaskDateProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  scheduleType: ScheduleType;
}

const TaskDate = ({ label, value, onChange, scheduleType }: TaskDateProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!value && onChange && !isDisabled) {
      onChange(new Date().toISOString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabledCalender = () => {
    switch (label) {
      case "開始日":
        return scheduleType === "start-tbd" || scheduleType === "fully-tbd";
      case "終了日":
        return scheduleType === "end-tbd" || scheduleType === "fully-tbd";
      default:
        return false;
    }
  };

  const isDisabled = disabledCalender();

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange && !isDisabled) {
      const timeInput = document.getElementById(
        `time-${label}`
      ) as HTMLInputElement;
      const timeValue = timeInput?.value || "00:00:00";

      const [hours, minutes, seconds] = timeValue.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

      onChange(newDate.toISOString());
    }
    setOpen(false);
  };

  const handleTimeChange = (timeValue: string) => {
    if (value && onChange && !isDisabled) {
      const [hours, minutes, seconds] = timeValue.split(":");
      const newDate = new Date(value);
      newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
      onChange(newDate.toISOString());
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="date-picker" className="px-1 whitespace-nowrap">
        {label}:
      </Label>
      <div className="flex w-full items-center">
        <Popover
          open={isDisabled ? false : open}
          onOpenChange={isDisabled ? undefined : setOpen}
        >
          <PopoverTrigger asChild className="flex-1">
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
              disabled={isDisabled}
            >
              {isDisabled
                ? "未設定"
                : (value ? new Date(value) : new Date()).toLocaleDateString()}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
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
          value={
            isDisabled
              ? ""
              : value
              ? new Date(value).toTimeString().slice(0, 8)
              : "00:00:00"
          }
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={isDisabled}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default TaskDate;
