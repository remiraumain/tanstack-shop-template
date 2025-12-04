import { IconType } from "react-icons/lib";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { SiGmail, SiProtonmail, SiIcloud } from "react-icons/si";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { FaYahoo } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

type EmailVerificationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string | null;
};

function getMailProvider(
  email: string,
): { url: string; label: string; icon: IconType } | null {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return null;

  if (domain === "gmail.com") {
    return { url: "https://mail.google.com/", label: "Gmail", icon: SiGmail };
  }

  if (
    domain === "outlook.com" ||
    domain === "hotmail.com" ||
    domain === "live.com"
  ) {
    return {
      url: "https://outlook.live.com/mail",
      label: "Outlook",
      icon: PiMicrosoftOutlookLogo,
    };
  }

  if (domain === "yahoo.com") {
    return {
      url: "https://mail.yahoo.com/",
      label: "Yahoo Mail",
      icon: FaYahoo,
    };
  }

  if (domain === "icloud.com" || domain === "me.com" || domain === "mac.com") {
    return {
      url: "https://www.icloud.com/mail",
      label: "iCloud Mail",
      icon: SiIcloud,
    };
  }

  if (domain === "proton.me") {
    return {
      url: "https://mail.proton.me/u/0/inbox",
      label: "Proton Mail",
      icon: SiProtonmail,
    };
  }

  return null;
}

export function EmailVerificationDialog({
  open,
  onOpenChange,
  email,
}: EmailVerificationDialogProps) {
  const provider = email ? getMailProvider(email) : null;
  const Icon = provider?.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vérifiez votre email</AlertDialogTitle>
          <AlertDialogDescription>
            Nous vous avons envoyé un email de vérification à{" "}
            <span className="font-bold">{email}</span>. <br />
            Veuillez cliquer sur le lien dans cet email pour activer votre
            compte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          {provider && Icon ? (
            <AlertDialogAction
              onClick={() => {
                window.open(provider.url, "_blank", "noopener,noreferrer");
                onOpenChange(false);
              }}
            >
              <Icon className="h-4 w-4" /> Ouvrir {provider.label}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={() => onOpenChange(false)}>
              J'ai compris
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
