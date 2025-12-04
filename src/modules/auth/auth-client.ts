import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  getSession,
  sendVerificationEmail,
} = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  redirectTo: "/",
  plugins: [inferAdditionalFields<typeof auth>()],
});
