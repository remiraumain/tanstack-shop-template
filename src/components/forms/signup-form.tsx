import { signupSchema } from "@/modules/auth/schema";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/modules/auth/auth-client";
import { toast } from "sonner";
import { getRouter } from "@/router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      const router = getRouter();
      const { error } = await signUp.email({
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
      });

      if (error) {
        if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          setServerError("Compte déjà existant.");
        } else {
          setServerError("Un problème est survenu.");
        }
        return;
      }

      toast.success("Votre compte a bien été créé.");

      router.navigate({ to: "/" });
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md border-0">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Créer un compte pour accéder à toutes les fonctionnalités.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="firstName">
              {(field) => (
                <Field>
                  <FieldLabel>Prénom</FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="given-name"
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field name="lastName">
              {(field) => (
                <Field>
                  <FieldLabel>Nom</FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="family-name"
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>

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

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel>Confirmer le mot de passe</FieldLabel>
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
                form="signup-form"
                className="w-full"
                disabled={form.state.isSubmitting}
              >
                {form.state.isSubmitting
                  ? "Creation de compte..."
                  : "Créer un compte"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
