"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
// import { supabase } from "@/lib/supabase";
import { SignupForm } from "@/schemas/signupSchema";

export const signup = async (data: SignupForm) => {

  try {

    const supabase = await createClient();

    const supabaseSignup = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (supabaseSignup.error) {
      return {
        success: false,
        error: supabaseSignup.error.message,
      };
    }

    if (!supabaseSignup.data.user) {
      return {
        success: false,
        error: "ユーザー情報が取得できませんでした。",
      };
    }

    const prismaSignup = await prisma.user.create({
      data: {
        id: supabaseSignup.data.user.id,
        username: data.username,
        email: data.email,
      },
    });

    return {
      success: true,
      user: prismaSignup
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "サインアップ中にエラーが発生しました。",
    };
  }
};
