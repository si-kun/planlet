import { z } from "zod";

// プライベートタスクのZodスキーマ
export const privateTaskSchema = z
  .object({
    title: z.string().min(1, "タイトルは必須です"),
    description: z.string().min(1, "説明は必須です"),
    scheduleType: z.enum(["normal", "start-tbd", "end-tbd", "fully-tbd"]),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    category: z.enum(["学習", "仕事", "趣味", "その他"]),
    checklist: z.array(
      z.object({
        id: z.string(),
        title: z.string().min(1, "チェックリストの項目は必須です"),
        isChecked: z.boolean(),
        order: z.number()
      })
    ),
  })
  .refine((data) => {
    switch (data.scheduleType) {
      case "normal":
        return !!data.startDate;
      case "start-tbd":
        return !!data.endDate;
      case "end-tbd":
        return !!data.startDate;
      case "fully-tbd":
        return true;
      default:
        return false;
    }
  });

// z.inferで型を生成
export type PrivateTaskForm = z.infer<typeof privateTaskSchema>;
