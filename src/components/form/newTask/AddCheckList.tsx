import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PrivateTaskForm } from "@/schemas/taskSchema";
import { X } from "lucide-react";
import React from "react";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

interface AddCheckListProps {
  fields: FieldArrayWithId<PrivateTaskForm, "checklist", "id">[];
  register: UseFormRegister<PrivateTaskForm>;
  remove: (index: number) => void;
  addChecklistItem: () => void;
}

const AddCheckList = ({
  fields,
  register,
  remove,
  addChecklistItem,
}: AddCheckListProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p>チェックリスト</p>
          <Button
            type="button"
            className="bg-blue-300 hover:bg-blue-400"
            onClick={addChecklistItem}
          >
            項目を追加
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 ">
              <Checkbox
                id={item.id}
                {...register(`checklist.${index}.isChecked`)}
                className="w-8 h-8 checked:bg-green-300"
              />
              <Input
                placeholder="タスクを入力"
                {...register(`checklist.${index}.title`)}
              />
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AddCheckList;
