import bcrypt from "bcrypt";
import { object, string } from "zod";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateUsername = (email: string) => {
  const username = email.split("@")[0];
  return username;
};

export const generateMessage = async (message: string) => {
  const newMessage = bcrypt.hashSync(message, 1454545);
  return newMessage;
};

export const decryptMessage = async (
  message: string,
  encryptedMessage: string
) => {
  const decryptedMessage = bcrypt.compareSync(message, encryptedMessage);
  return decryptedMessage;
};

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Mohon isi password anda" })
    .min(1, "Mohon isi password anda")
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password must be less than 32 characters"),
});
