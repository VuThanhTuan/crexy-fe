"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { Checkbox } from "@/components/FormElements/checkbox";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { useAdminAuth } from "@/app/admin/(with-layout)/admin-auth";

const loginSchema = z.object({
  userName: z
    .string()
    .min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
});

type LoginFormValues = z.output<typeof loginSchema>;

export default function SigninWithPassword() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const { login, isAuthenticating } = useAdminAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      await login({ email: values.userName, password: values.password });
      router.push("/admin");
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{
        message?: string;
        error?: string;
        errors?: { message?: string }[];
      }>;
      const data = axiosErr.response?.data;
      const apiMessage =
        data?.message || data?.error || data?.errors?.[0]?.message || "Login failed. Please try again.";
      setFormError(apiMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <div className="mb-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-red-600 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
          {formError}
        </div>
      )}

      <Controller
        control={control}
        name="userName"
        render={({ field }) => (
          <div className="mb-4">
            <InputGroup
              type="text"
              label="Email"
              className="mb-1 [&_input]:py-[15px]"
              placeholder="Enter your email"
              name={field.name}
              handleChange={(e) => field.onChange(e.target.value)}
              value={field.value}
              icon={<EmailIcon />}
            />
            {errors.userName && (
              <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <div className="mb-5">
            <InputGroup
              type="password"
              label="Password"
              className="mb-1 [&_input]:py-[15px]"
              placeholder="Enter your password"
              name={field.name}
              handleChange={(e) => field.onChange(e.target.value)}
              value={field.value}
              icon={<PasswordIcon />}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
            <Checkbox
              label="Remember me"
              name={field.name}
              withIcon="check"
              minimal
              radius="md"
              onChange={(e) => field.onChange(e.target.checked)}
            />

            <Link
              href="/auth/forgot-password"
              className="hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>
        )}
      />

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70"
          disabled={isSubmitting || isAuthenticating}
        >
          Sign In
          {(isSubmitting || isAuthenticating) && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
