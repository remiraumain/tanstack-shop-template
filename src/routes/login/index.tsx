import { SignInForm } from "@/components/forms/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <div className="hidden flex-1 md:flex"></div>
      <div className="bg-card flex flex-1 items-center justify-center">
        <Card className="mx-auto w-full max-w-md border-0">
          <CardHeader>
            <CardTitle>Connectez-vous</CardTitle>
            <CardDescription>
              Pour accéder à toutes les fonctionnalités.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
