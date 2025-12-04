import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schemas/auth-schema";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    async sendVerificationEmail({ user, url }) {
      console.log("Sending verification email to:", user.email);
      //   change to waitUntil on cloudflare worker
      await sendEmail({
        to: user.email,
        subject: "Vérifie ton adresse email",
        html: `<p>Bienvenue 👋</p>
               <p>Clique sur ce lien pour vérifier ton email :</p>
               <p><a href="${url}">${url}</a></p>`,
      });
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
  plugins: [tanstackStartCookies()],
});
