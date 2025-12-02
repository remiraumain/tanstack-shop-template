import { SignInForm } from "@/components/forms/signin-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <div className="hidden flex-1 md:flex"></div>
      <div className="bg-card flex flex-1 items-center justify-center">
        <SignInForm />
      </div>
    </div>
  );
}
