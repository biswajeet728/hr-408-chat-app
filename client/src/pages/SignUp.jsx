import React from "react";
import { signUpSchema } from "../lib/zod";
import AuthForms from "../components/AuthForms";

function SignUp() {
  return (
    <div className="w-full flex items-center justify-center h-full flex-grow px-4 md:px-0">
      <div className="w-full md:w-4/12 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-center font-semibold text-2xl">
            Sign Up | Chat APp
          </h2>
        </div>

        <AuthForms
          type="Sign_Up"
          defaultValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
          }}
          schema={signUpSchema}
        />
      </div>
    </div>
  );
}

export default SignUp;
