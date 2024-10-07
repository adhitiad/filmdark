
import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Mohon isi password anda" })
    .min(1, "Mohon isi password anda")
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password must be less than 32 characters"),
});
