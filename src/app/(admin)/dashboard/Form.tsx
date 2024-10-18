"use client";

import { reloadSession } from "@/lib/funcs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field has to be filled.",
    })
    .email("This is not a valid email")
    .max(300, {
      message: "Password can't be longer than 300 characters.",
    }),
});

const DashboardForm = ({ email }: { email: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  });

  const { data: session, update } = useSession();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`/api/updateEmail`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
      return;
    }

    update({
      ...session,
      user: {
        ...session?.user,
        email: values.email,
      },
    });

    reloadSession();
    router.refresh();

    toast.success("Email changed!");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 max-w-md mx-auto"
    >
      <h1 className="text-xl font-semibold">Ubah email Anda</h1>
      <div className="grid grid-cols-1 gap-1.5">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="johndoe@whatever.com"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...form.register("email")}
        />
        <p className="text-sm text-muted-foreground">
          Ini adalah email yang Anda gunakan untuk masuk ke aplikasi kami.
        </p>
        {form.formState.errors.email?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email?.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
      >
        Ubah email
      </button>
    </form>
  );
};

export default DashboardForm;
