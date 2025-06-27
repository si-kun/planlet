import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import TaskDate from "./TaskDate";
import { Label } from "../ui/label";
import { ScheduleType } from "@/types/form";
import { SCHEDULE_OPTIONS } from "@/constants/schedule";

interface ScheduleSelectorProps<T extends FieldValues> {
  control: Control<T>;
  startDateName: Path<T>;
  endDateName: Path<T>;
  scheduleTypeName: Path<T>;
  scheduleType: ScheduleType;
}

const ScheduleSelector = <T extends FieldValues>({
  control,
  startDateName,
  endDateName,
  scheduleTypeName,
  scheduleType,
}: ScheduleSelectorProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={startDateName}
        control={control}
        render={({ field }) => (
          <TaskDate
            label="開始日"
            value={field.value}
            onChange={field.onChange}
            scheduleType={scheduleType}
          />
        )}
      />
      <Controller
        name={endDateName}
        control={control}
        render={({ field }) => (
          <TaskDate
            label="終了日"
            value={field.value}
            onChange={field.onChange}
            scheduleType={scheduleType}
          />
        )}
      />
      <Controller
        name={scheduleTypeName}
        control={control}
        render={({ field }) => (
          <RadioGroup
            className="grid grid-cols-2 gap-4 justify-between ml-auto p-2"
            defaultValue="normal"
            value={field.value}
            onValueChange={field.onChange}
          >
            {SCHEDULE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center gap-1">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default ScheduleSelector;
