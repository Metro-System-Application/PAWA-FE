"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/store/user-store";

import { User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/input/password-input";
import { loginFormSchema, LoginFormValues } from "@/schemas/login";
import { ROUTES } from "@/config/routes";
import { getGoogleAuthLink } from "@/action/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { login, loginGoogle } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const onGoogleLoginAction = loginGoogle(code);

    toast.promise(onGoogleLoginAction, {
      loading: "Signing in with Google…",

      success: (res) => {
        if ("passengerEmail" in res) {
          router.push(ROUTES.DASHBOARD);
          return "Logged in with Google!";
        }

        const { givenName, familyName } = res.data;
        const queryParams = new URLSearchParams({
          givenName,
          familyName,
        }).toString();

        router.push(`${ROUTES.AUTH.REGISTER}?${queryParams}`);
        return "Continue registration with Google";
      },

      error: (e) => {
        switch (e.response?.status) {
          case 401:
            return e.response.data?.message || "Invalid Google credentials";
          case 403:
            return e.response.data?.message || "Google access denied";
          case 500:
            return e.response.data?.message || "Google auth server error";
          default:
            return e.response?.data?.message || "Google authentication failed";
        }
      },
    });
  }, [code, loginGoogle, router]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onGoogleLogin = () => {
    const onGotLinkAction = getGoogleAuthLink();

    toast.promise(onGotLinkAction, {
      loading: "Redirecting to Google...",
      success: (url: string) => {
        window.location.replace(url);
        return "Redirecting...";
      },
      error: (e) => {
        switch (e.response.status) {
          case 401:
            return e.response.data?.message || "Invalid credentials";
          case 403:
            return e.response.data?.message || "Access denied";
          case 500:
            return e.response.data?.message || "Internal server error";
          default:
            return (
              e.response.data?.message || "Getting link from Google failed"
            );
        }
      },
    });
  };

  const onSubmit = async (data: LoginFormValues) => {
    const onLoginAction = login(data.email, data.password);

    toast.promise(onLoginAction, {
      loading: "Logging in...",
      success: () => {
        router.push(searchParams.get("from") || ROUTES.DASHBOARD);
        return "Login successful. Redirecting to dashboard...";
      },
      error: (e) => {
        switch (e.response.status) {
          case 401:
            return e.response.data?.message || "Invalid credentials";
          case 403:
            return e.response.data?.message || "Access denied";
          case 500:
            return e.response.data?.message || "Internal server error";
          default:
            return e.response.data?.message || "Login failed";
        }
      },
    });
  };

  return (
    <Form {...loginForm}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={loginForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email to access the metro system
          </p>
        </div>
        <div className="grid gap-5">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={loginForm.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="flex w-full justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1"
              asChild
              onClick={() => router.push(ROUTES.DASHBOARD)}
            >
              <div>
                <User className="mr-2 h-4 w-4" />
                Login as Guest
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={onGoogleLogin}
              type="button"
            >
              <svg
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                fill="#000000"
                className="mr-2 h-4 w-4"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  ></path>
                </g>
              </svg>
              Login with Google
            </Button>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary underline underline-offset-4 font-bold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
