import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().max(10, { message: "Invalid phone number" }),
});

const signInSchema = z.object({
  emailOrPhone: z.string().refine(
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
      const indianPhoneRegex = /^[6789]\d{9}$/; // Strict 10-digit Indian phone number

      return emailRegex.test(value) || indianPhoneRegex.test(value);
    },
    {
      message: "Invalid email or 10-digit Indian phone number",
    }
  ),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export { signInSchema };
