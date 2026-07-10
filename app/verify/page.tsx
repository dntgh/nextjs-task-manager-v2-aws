"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function VerifyContent() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const { handleConfirmSignUp, handleResendSignUpCode, handleSignIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      toast.error("Email parameter missing. Please start the signup process again.");
      router.push("/signup");
    }
  }, [searchParams, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !email) {
      toast.error("Please enter the verification code");
      return;
    }

    if (code.length !== 6) {
      toast.error("Verification code must be 6 digits");
      return;
    }

    try {
      const response = await handleConfirmSignUp({
        username: email,
        confirmationCode: code
      });

      if (response.nextStep?.signUpStep === 'DONE') {
        toast.success("Email verified successfully! Logging you in...");

        // Auto-login after successful verification
        try {
          // We need to prompt for password or use a stored approach
          // Since we're API-only, we'll redirect to login with success message
          toast.success("Email verified! Please login with your credentials.");
          router.push("/login");
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          toast.error("Verification successful. Please login manually.");
          router.push("/login");
        }
      }
    } catch (error: any) {
      let errorMessage = "Verification failed. Please try again.";

      if (error.message?.includes('Invalid verification code') || error.message?.includes('CodeMismatchException')) {
        errorMessage = "Invalid verification code. Please check and try again.";
      } else if (error.message?.includes('ExpiredCodeException') || error.message?.includes('expired')) {
        errorMessage = "Verification code has expired. Please request a new code.";
      } else if (error.message?.includes('User not found') || error.message?.includes('UserNotFoundException')) {
        errorMessage = "User not found. Please sign up again.";
        router.push("/signup");
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email parameter missing. Please start the signup process again.");
      router.push("/signup");
      return;
    }

    setIsResending(true);
    try {
      await handleResendSignUpCode(email);
      toast.success("Verification code resent! Please check your email.");
    } catch (error: any) {
      let errorMessage = "Failed to resend code. Please try again.";

      if (error.message?.includes('User not found') || error.message?.includes('UserNotFoundException')) {
        errorMessage = "User not found. Please sign up again.";
        router.push("/signup");
      } else if (error.message?.includes('LimitExceededException') || error.message?.includes('too many')) {
        errorMessage = "Too many attempts. Please wait before requesting another code.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <main className="flex flex-1 items-center justify-center w-full p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Redirecting to signup...</p>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center w-full p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Verify your email
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                }}
                disabled={isLoading}
                required
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check your email for the verification code
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResendCode}
              disabled={isResending || isLoading}
            >
              {isResending ? "Resending..." : "Resend Verification Code"}
            </Button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Wrong email?{" "}
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Start over
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="flex flex-1 items-center justify-center w-full p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </main>
    }>
      <VerifyContent />
    </Suspense>
  );
}
