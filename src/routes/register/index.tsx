import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/forms/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <div className="hidden flex-1 md:flex"></div>
      <div className="bg-card flex flex-1 items-center justify-center">
        <Card className="mx-auto w-full max-w-md border-0">
          <CardHeader>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>
              Créer un compte pour accéder à toutes les fonctionnalités.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
