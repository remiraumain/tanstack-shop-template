import { signInSchema } from "@/modules/auth/schema";
import { useForm } from "@tanstack/react-form";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sendVerificationEmail, signIn } from "@/modules/auth/auth-client";
import { toast } from "sonner";
import { getRouter } from "@/router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { EmailVerificationDialog } from "../auth/email-verification-dialog";

export function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailUsed, setEmailUsed] = useState<string | null>(null);
  const router = getRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await signIn.email({
        email: value.email,
        password: value.password,
      });

      if (error) {
        if (error.code === "EMAIL_NOT_VERIFIED") {
          setEmailUsed(value.email);
          setIsEmailSent(true);

          await sendVerificationEmail({
            email: value.email,
          });

          return;
        }
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          setServerError("Identifiants incorrects.");
        } else {
          setServerError("Un problème est survenu.");
        }
        return;
      }

      setServerError(null);

      onSuccess?.();

      toast.success("Vous êtes connecté.");

      router.navigate({ to: "/" });
    },
  });

  return (
    <>
      <EmailVerificationDialog
        open={isEmailSent}
        onOpenChange={setIsEmailSent}
        email={emailUsed}
      />
      <form
        id="signin-form"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                autoComplete="email"
              />
              {field.state.meta.errors?.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel>Mot de passe</FieldLabel>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                autoComplete="new-password"
              />
              {field.state.meta.errors?.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        {serverError && (
          <FieldDescription className="text-destructive">
            {serverError}
          </FieldDescription>
        )}

        <FieldGroup>
          <Field className="px-6 py-6">
            <Button
              type="submit"
              form="signin-form"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Pas encore inscrit ?{" "}
              <Link to="/auth/signup">Créer un compte</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
