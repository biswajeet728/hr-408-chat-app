import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { cn } from "../lib/util";
import { useAuthStore } from "../store/useAuthStore";

const AuthForms = ({ defaultValues, type, schema }) => {
  const navigate = useNavigate();
  const { login, createNew, isLoggingIn } = useAuthStore();
  const isSignIn = type === "Sign_In";

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data) => {
    console.log(data);
    isSignIn ? await login(data) : await createNew(data);
  };

  return (
    <div className="w-full max-w-full md:max-w-lg mx-auto m-2">
      <form className="p-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col items-center justify-center">
          {Object.keys(defaultValues).map((key) => {
            return (
              <React.Fragment key={key}>
                <div
                  className="bg-dark-200 bg-opacity-45 p-2 rounded-lg w-full"
                  key={key}
                >
                  <input
                    key={key}
                    type={key === "password" ? "password" : "text"}
                    placeholder={key.split(/(?=[A-Z])/).join(" ")}
                    className={cn(
                      "w-full border text-slate-500 placeholder:capitalize py-2 px-2 outline-none rounded-md"
                    )}
                    {...form.register(key)}
                  />
                </div>
                <div className="w-full">
                  {form.formState.errors[key] ? (
                    <p className="text-red-500 text-sm ml-2">
                      {typeof form.formState.errors[key]?.message ===
                        "string" && form.formState.errors[key]?.message}
                    </p>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}

          <div className="w-full px-2">
            <button
              className="w-full bg-slate-400 py-2 mt-4 mb-3 hover:bg-slate-400 text-lg text-white rounded-md"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </form>

      <div className="text-center my-3">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          to={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-blue-500 hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForms;
