"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLoggout = async () => {
    await signOut();
  };

  return (
    <Button onClick={handleLoggout}>
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
