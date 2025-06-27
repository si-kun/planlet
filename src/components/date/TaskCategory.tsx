import { Label } from "@radix-ui/react-label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller } from "react-hook-form";

interface TaskCategoryProps {
  name: string;
  control: any;
}

const TaskCategory = ({ name, control }: TaskCategoryProps) => {
  const DammyCategories = ["学習", "仕事", "趣味", "その他"];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <Label htmlFor="categories">カテゴリー</Label>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="カテゴリーを選択" />
            </SelectTrigger>
            <SelectContent>
              {DammyCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};

export default TaskCategory;
