"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Placeholder: replace with real authentication call.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    if (!formState.username || !formState.password) {
      setError("Enter both username and password.");
      return;
    }

    // Navigate to the existing admin dashboard route
    router.push("/admin");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            goBishoftu Admin
          </p>
          <h1 className="mt-2 text-2xl font-bold">Secure Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Only administrators who know this URL can sign in.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Access Dashboard"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          For security, share this login page only with verified administrators.
        </p>
      </div>
    </section>
  );
}
