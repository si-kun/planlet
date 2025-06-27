"use client";

import { v4 as uuidv4 } from "uuid";
import TaskDate from "@/components/date/TaskDate";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import TaskCategory from "@/components/date/TaskCategory";
import PrioritySelect from "@/components/select/PrioritySelect";

const privateSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  description: z.string().min(1, "説明は必須です"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  category: z.enum(["学習", "仕事", "趣味", "その他"]).default("学習"),
  checklist: z
    .array(
      z.object({
        id: z.string(),
        checkTitle: z.string().min(1, "チェックリストの項目は必須です"),
        isChecked: z.boolean().default(false),
      })
    )
    .default([
      {
        id: uuidv4(),
        checkTitle: "",
        isChecked: false,
      },
    ]),
});

type PrivateTask = z.infer<typeof privateSchema>;

const NewTask = () => {
  const [selectredPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high"
  >("low");
  

  const { register, handleSubmit, control } = useForm<PrivateTask>({
    resolver: zodResolver(privateSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "low",
      category: "学習",
      checklist: [
        {
          id: uuidv4(),
          checkTitle: "",
          isChecked: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "checklist",
  });

  //チェックリスト追加
  const addChecklistItem = () => {
    append({
      id: uuidv4(),
      checkTitle: "",
      isChecked: false,
    });
  };

  const handleFormSubmit = (data: PrivateTask) => {
    console.log("送信",data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 flex flex-col gap-8 bg-gray-50/80 h-full"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="">タスクタイトル</Label>
        <Input
          {...register("title")}
          className="border-blue-300 focus-visible:ring-blue-300"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="">詳細説明</Label>
        <Textarea
          {...register("description")}
          className="border-blue-300 focus-visible:ring-blue-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <TaskDate
              label="開始日"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <TaskDate
              label="終了日"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <span className="text-xs text-gray-500">
          期限を設定しない場合は終了日を設定しないでください
        </span>
      </div>
      
      <PrioritySelect control={control} name="priority" />

      {/* カテゴリー */}
      <TaskCategory name="category" control={control} />

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
                  {...register(`checklist.${index}.checkTitle`)}
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

      <div className="flex items-center justify-end gap-3">
        <Button
          variant={"secondary"}
          className="bg-indigo-100 px-10 py-5 hover:bg-indigo-200"
        >
          下書き保存
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 px-10 py-5 hover:-translate-y-1">
          タスクを保存
        </Button>
      </div>
    </form>
  );
};

export default NewTask;
