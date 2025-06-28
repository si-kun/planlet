"use client";

import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TaskCategory from "@/components/date/TaskCategory";
import PrioritySelect from "@/components/select/PrioritySelect";
import { PrivateTaskForm, privateTaskSchema } from "@/schemas/taskSchema";
import ScheduleSelector from "@/components/date/ScheduleSelector";
import AddCheckList from "@/components/form/newTask/AddCheckList";
import { ScheduleType } from "@/types/form";
import toast from "react-hot-toast";

const NewTask = () => {
  const { register, handleSubmit, control, watch } = useForm<PrivateTaskForm>({
    resolver: zodResolver(privateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      scheduleType: "normal" as ScheduleType,
      startDate: "",
      endDate: "",
      priority: "low",
      category: "学習",
      checklist: [
        {
          id: uuidv4(),
          checkTitle: "",
          isChecked: false,
          order: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "checklist",
  });

  const scheduleType = watch("scheduleType");

  //チェックリスト追加
  const addChecklistItem = () => {
    append({
      id: uuidv4(),
      checkTitle: "",
      isChecked: false,
      order: fields.length,
    });
  };

  const handleFormSubmit = (data: PrivateTaskForm) => {
    const submitData = {
      ...data,
      startDate:
        data.scheduleType === "start-tbd" || data.scheduleType === "fully-tbd"
          ? ""
          : data.startDate,
      endDate:
        data.scheduleType === "end-tbd" || data.scheduleType === "fully-tbd"
          ? ""
          : data.endDate,
    };

    console.log("送信", submitData);

    try {
      
    }catch(error) {
      console.error("タスクの送信中にエラーが発生しました:", error);
      toast.error("タスクの送信中にエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 flex flex-col gap-8 bg-gray-50/80 min-h-screen rounded-lg shadow-md max-w-3xl mx-auto"
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
          className="border-blue-300 min-h-30 resize-none focus-visible:ring-blue-300"
        />
      </div>

      {/* スケジュール選択 */}
      <ScheduleSelector
        control={control}
        startDateName={"startDate"}
        endDateName={"endDate"}
        scheduleTypeName={"scheduleType"}
        scheduleType={scheduleType}
      />

      {/* 優先度選択 */}
      <PrioritySelect control={control} name="priority" />

      {/* カテゴリー */}
      <TaskCategory name="category" control={control} />

      {/* チェックリスト */}
      <AddCheckList
        fields={fields}
        register={register}
        remove={remove}
        addChecklistItem={addChecklistItem}
      />

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
