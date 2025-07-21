"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
      setChecking(false);
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (!checking) {
      if (isLoggedIn) {
        router.push("/user");
      } else {
        router.push("/auth/login");
      }
    }
  }, [checking, isLoggedIn, router]);

  if (checking) {
    return (
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontSize: "1.2rem", color: "#5C92D8" }}>Checking session...</div>
      </div>
    );
  }

  return null; 
}
