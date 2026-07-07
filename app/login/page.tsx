"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
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
    } catch (error: any) {
      toast.error(error.message || "Authentication failed. Please check your credentials.");
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
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (isNewPasswordRequired ? "Updating..." : "Signing in...") 
                : (isNewPasswordRequired ? "Update Password" : "Sign In")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
