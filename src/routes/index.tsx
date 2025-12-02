import { SignInForm } from "@/components/forms/signin-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOut, useSession } from "@/modules/auth/auth-client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <main className="flex w-full flex-1 flex-col">
      <h1 className="p-4 text-2xl">
        Home page {session?.user && `de ${session.user.name}`}
      </h1>
      <div className="flex justify-center">
        <div>
          {session?.user ? (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                signOut();
                toast.success("Vous êtes bien déconnecté.");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button asChild>
              <Link to="/register">New user</Link>
            </Button>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Login dialog
            </Button>
            <DialogContent className="bg-card">
              <DialogTitle>Connectez-vous</DialogTitle>
              <DialogDescription>
                Pour accéder à toutes les fonctionnalités.
              </DialogDescription>
              <SignInForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
