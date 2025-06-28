import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(1, "ユーザー名は必須です").max(10, "ユーザー名は10文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
})

export type SignupForm = z.infer<typeof signupSchema>