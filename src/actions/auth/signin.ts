"use server"

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const signin = async(data: {email: string, password: string}) => {

    try {

        const supabase = await createClient();

        const supabaseSignin = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (supabaseSignin.error) {
            console.error("Supabase sign-in error:", supabaseSignin.error);
            return {
                success: false,
                error: "サインインに失敗しました"
            }
        }

        if (!supabaseSignin.data.user) {
            return {
                success: false,
                error: "ユーザー情報が取得できませんでした。",
            };
        }

        const userId = supabaseSignin.data.user.id;

        const prismaSignin = await prisma.user.findUnique({
            where: {
                id:userId
            }
        })

        if (!prismaSignin) {
            return {
                success: false,
                error: "ユーザーが見つかりません。",
            };
        }

        revalidatePath("/", "layout");

        return {
            success: true,
            data: {
                id: prismaSignin.id,
                username: prismaSignin.username,
                email: prismaSignin.email,
            },
            message: `${prismaSignin.username}さん、サインインに成功しました。`
        }


    } catch(error) {
        console.error("Signin error:", error);
        return {
            success: false,
            error: "サインイン中にエラーが発生しました。",
        };
    }
}