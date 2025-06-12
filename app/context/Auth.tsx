"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/User";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  //   if (!user) {
  //     return null; // Tai lataa jotain spinneriä
  //   }

  return <>{children}</>;
}
