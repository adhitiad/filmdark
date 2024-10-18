"use client";

import { signout } from "@/lib/actions";

const SignOutButton = () => {
  return (
    <button
      type="button"
      onClick={() => signout()}
      className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out sm:text-base sm:px-6 sm:py-3"
    >
      Keluar
    </button>
  );
};

export default SignOutButton;
