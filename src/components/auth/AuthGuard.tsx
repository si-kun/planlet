"use client";

import { getUser } from "@/actions/auth/getUser";
import { userAtom } from "@/atom/auth";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useAtom(userAtom);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await getUser();

        if (response.success && response.data) {
          setUser(response.data);
          router.replace("/");
          console.log("ユーザー情報:", response.data);
        }
      } catch (error) {
        console.error("認証エラー:", error);
        setUser(null);
        router.replace("/signin");
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [router, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
