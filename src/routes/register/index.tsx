import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/forms/signup-form";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <div className="hidden flex-1 md:flex"></div>
      <div className="bg-card flex flex-1 items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
}
