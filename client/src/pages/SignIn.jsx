import React from "react";
import AuthForms from "../components/AuthForms";
import { signInSchema } from "../lib/zod";

function SignIn() {
  return (
    <div className="w-full flex items-center justify-center h-full flex-grow px-4 md:px-0">
      <div className="w-full md:w-4/12 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-center font-semibold text-2xl">Chat APp</h2>
        </div>

        <AuthForms
          type="Sign_In"
          defaultValues={{
            emailOrPhone: "",
            password: "",
          }}
          schema={signInSchema}
        />
      </div>
    </div>
  );
}

export default SignIn;
