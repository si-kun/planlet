
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen p-5 flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default AuthLayout;
