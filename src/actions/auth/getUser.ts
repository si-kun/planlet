"use server"

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const getUser = async () => {
    try {

        const supabase = await createClient();

        const {data: { user} , error} = await supabase.auth.getUser();

        if(error) {
            console.error("Supabase getUser error:", error);
            return {
                success: false,
                error: "ユーザー情報の取得に失敗しました。",
            };
        }
        if (!user) {
            return {
                success: false,
                error: "ユーザーが見つかりません。",
            };
        }

        const prismaUser = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                myTasks: true,
                myCategories: true,
            }
        })

        return {
            success: true,
            data: prismaUser,
        }


    } catch(error) {
        console.error("Error fetching user:", error);
        return {
            success: false,
            error: "ユーザー情報の取得に失敗しました。",
        }
    }
}