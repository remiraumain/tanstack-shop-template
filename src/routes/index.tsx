import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/modules/auth/auth-client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { data: session } = useSession();

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
        </div>
      </div>
    </main>
  );
}
