import { signIn } from "@/lib/auth";

const GoogleLoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-white text-gray-800 font-bold rounded-md shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
      >
        Login dengan Google
      </button>
    </form>
  );
};

export default GoogleLoginButton;
