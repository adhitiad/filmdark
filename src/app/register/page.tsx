import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./Form";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <section className="container flex items-center justify-center py-12">
      <div className="w-[500px]">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
