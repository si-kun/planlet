import React from "react";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Priority = "low" | "medium" | "high";

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "低",
  medium: "中",
  high: "高",
} as const;

const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-green-100 border-green-300 text-green-800",
  medium: "bg-yellow-100 border-yellow-300 text-yellow-800",
  high: "bg-red-100 border-red-300 text-red-800",
} as const;

interface PrioritySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
}

const PrioritySelect = <T extends FieldValues>({
  control,
  name,
  label = "優先度",
  error,
}: PrioritySelectProps<T>) => {
  const PRIORITY_OPTIONS: Priority[] = ["low", "medium", "high"];

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-2">
            {PRIORITY_OPTIONS.map((option) => (
              <Card
                key={option}
                className={`w-[33.3%] text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${
                  field.value === option
                    ? PRIORITY_COLORS[option]
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                } `}
                onClick={() => field.onChange(option)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    field.onChange(option);
                  }
                }}
                aria-pressed={field.value === option}
                aria-label={`優先度を: ${PRIORITY_LABELS[option]}に設定`}
              >
                <div className="font-medium">{PRIORITY_LABELS[option]}</div>
                <div className="text-xs opacity-75 mt-1">{option}</div>
              </Card>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default PrioritySelect;
