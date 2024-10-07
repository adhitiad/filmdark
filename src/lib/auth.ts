import { PrismaAdapter } from "@auth/prisma-adapter";
import { hash } from "crypto";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ZodError } from "zod";
import { signInSchema } from "../types/user";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          const zodError = parsedCredentials.error as ZodError;
          throw new Error(zodError.errors[0].message);
        }

        const { email, password } = parsedCredentials.data;

        const userDoc: any = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            watchHistory: true,
          },
        });

        if (!userDoc) {
          throw new Error("User not found");
        }

const passwordMatch = hash(password, userDoc.salt)

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return userDoc;
      },    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
});
