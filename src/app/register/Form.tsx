"use client";

import { signInWithGoogle } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "This field has to be filled.",
      })
      .email("This is not a valid email")
      .max(300, {
        message: "Password can't be longer than 300 characters.",
      }),
    password: z
      .string()
      .min(6, { message: "Password has to be at least 6 characters long." }),
    confirmPassword: z.string().min(6, {
      message: "Confirm-Password has to be at least 6 characters long.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
      return;
    }

    toast.success("Account created!");
    form.reset();
    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Daftar</h2>
        <p className="text-gray-600 mb-6">
          Masukkan informasi Anda untuk membuat akun
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@whatever.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              {...form.register("email")}
            />
            <p className="text-gray-600 text-sm mt-1">
              Ini adalah email yang Anda gunakan untuk masuk ke aplikasi kami.
            </p>
            {form.formState.errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              {...form.register("password")}
            />
            <p className="text-gray-600 text-sm mt-1">
              Ini adalah kata sandi yang Anda gunakan untuk masuk ke aplikasi
              kami.
            </p>
            {form.formState.errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              {...form.register("confirmPassword")}
            />
            <p className="text-gray-600 text-sm mt-1">
              Harap konfirmasi kata sandi Anda
            </p>
            {form.formState.errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
            >
              Buat akun
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                signInWithGoogle();
              }}
              className="w-full bg-white text-gray-700 font-bold py-2 px-4 border border-gray-300 rounded focus:outline-none hover:bg-gray-100"
            >
              Daftar dengan Google
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
