"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { fetchAuthSession } from 'aws-amplify/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { resetGuestData } from "@/services/taskService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
  const [isDemoModeLoading, setIsDemoModeLoading] = useState(false);
  const { handleSignIn, handleConfirmSignIn, isLoading } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNewPasswordRequired && (!email || !password)) {
      toast.error("Please enter both email and password");
      return;
    }

    if (isNewPasswordRequired && !newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      if (isNewPasswordRequired) {
        const confirmResponse = await handleConfirmSignIn({ challengeResponse: newPassword });
        if (confirmResponse.nextStep?.signInStep === 'DONE') {
          toast.success("Password updated and logged in successfully");
          router.push("/");
          router.refresh();
        }
      } else {
        const response = await handleSignIn({ username: email, password });
        if (response.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          setIsNewPasswordRequired(true);
          toast.info("Please set a new password to continue.");
        } else if (response.nextStep?.signInStep === 'DONE') {
          toast.success("Logged in successfully");
          router.push("/");
          router.refresh();
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  const handleDemoMode = async () => {
    // NOTE: Intentional Architectural Trade-off (Tight Coupling)
    // Orchestrating backend data-seeding logic directly inside the Login page couples Authentication and Data flow tightly.
    // This approach was deliberately chosen to optimize development velocity and ensure a seamless single-loading UX for portfolio visitors.
    // Future Refactoring: Consider moving this data-reset trigger into a dedicated dashboard layout wrapper or middleware
    // to decouple authentication from business logic.
    setIsDemoModeLoading(true);
    try {
      const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL;
      const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD;

      if (!guestEmail || !guestPassword) {
        throw new Error("Guest credentials not configured. Please contact administrator.");
      }

      const response = await handleSignIn({ username: guestEmail, password: guestPassword });

      if (response.nextStep?.signInStep === 'DONE') {
        toast.success("Demo mode activated");

        try {
          const session = await fetchAuthSession();
          const freshToken = session.tokens?.idToken?.toString();

          if (freshToken) {
            await resetGuestData(freshToken);
            toast.success("Demo data reset successfully");
          } else {
            throw new Error("Failed to obtain authentication token");
          }
        } catch (apiError) {
          console.error("Failed to reset demo data:", apiError);
          toast.error("Failed to reset demo data, but you can still explore the app");
        }

        router.push("/");
        router.refresh();
      } else if (response.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setIsNewPasswordRequired(true);
        toast.info("Demo account requires password setup. Please contact administrator.");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Demo mode failed. Please try regular sign in.";
      toast.error(errorMessage);
    } finally {
      setIsDemoModeLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center w-full p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isNewPasswordRequired ? "Update Password" : "Sign in"}
          </CardTitle>
          <CardDescription>
            {isNewPasswordRequired
              ? "Your account requires a new password upon first login."
              : "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {!isNewPasswordRequired ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter a new secure password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? (isNewPasswordRequired ? "Updating..." : "Signing in...")
                : (isNewPasswordRequired ? "Update Password" : "Sign In")}
            </Button>
            {!isNewPasswordRequired && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isDemoModeLoading}
                  onClick={handleDemoMode}
                >
                  {isDemoModeLoading ? "Setting up demo..." : "Demo Mode"}
                </Button>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
