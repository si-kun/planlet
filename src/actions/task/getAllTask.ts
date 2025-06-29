"use server"

import { prisma } from "@/lib/prisma";

export const getAllTask = async () => {
    try {
        const response = await prisma.task.findMany({
            
        })
    } catch(error) {
        console.error("タスクの取得に失敗しました:", error);
        return {
            success: false,
            message: "タスクの取得に失敗しました",
        };
    }
}