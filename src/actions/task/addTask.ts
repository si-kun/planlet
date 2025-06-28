import { prisma } from "@/lib/prisma";
import { Checklist, Task } from "@prisma/client";

type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export const addTask = async (
  userId: string,
  task: CreateTask,
  categoryName: string,
  checklist: Checklist[]
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // カテゴリーの作成
      const category = await tx.myCategory.upsert({
        where: {
          userId_name: {
            userId,
            name: categoryName,
          },
        },
        update: {},
        create: {
          userId,
          name: categoryName,
        },
      });

      // タスクの作成
      const newTask = await tx.task.create({
        data: {
          title: task.title,
          description: task.description,
          scheduleType: task.scheduleType,
          startDate: task.startDate,
          endDate: task.endDate,
          priority: task.priority,
          userId,

          categories: {
            create: {
              categoryId: category.id,
            },
          },
          checklists: {
            create: checklist.map((item) => ({
              id: item.id,
              title: item.title,
              isChecked: item.isChecked,
              order: item.order,
            })),
          },
        },
        include: {
            categories: {
                include: {
                    category: true,
                }
            },
            checklists: true,
        }
      });

      return newTask;
    });

    return {
        success: true,
        message: "タスクが正常に追加されました",
        data: result,
    }
  } catch (error) {
    console.error("Error adding task:", error);
    return {
      success: false,
      message: "タスクの追加に失敗しました",
    };
  }
};
