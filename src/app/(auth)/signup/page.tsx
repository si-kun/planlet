"use client";

import { signup } from "@/actions/auth/signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGNUP_FORM_FIELDS } from "@/constants/signup";
import { SignupForm, signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignupSubmit = async (data: SignupForm) => {
    try {
      const response = await signup(data);
      if (response.success && response.user) {
        router.replace("/");
        toast.success("登録が完了しました!");
      } else {
        console.error("Signup failed:", response.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("登録処理が失敗しました");
    }
  };

  const isDisabled = !isValid || !isDirty || isSubmitting;

  return (
    <Card className="w-full">
      <form
        className="p-4 flex flex-col gap-4"
        onSubmit={handleSubmit(handleSignupSubmit)}
      >
        {SIGNUP_FORM_FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-1 relative pb-5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
            />
            {/* エラーメッセージの表示 */}
            {errors[field.name] && (
              <span className="text-xs text-red-600 absolute -bottom-0 left-0">
                {errors[field.name]?.message}
              </span>
            )}
          </div>
        ))}
        <Button
          disabled={isDisabled}
          className={`bg-green-500 hover:bg-green-500/80 disabled:bg-gray-400`}
        >
          {isSubmitting ? "登録中..." : "新規登録"}
        </Button>
      </form>
    </Card>
  );
};

export default Signup;
