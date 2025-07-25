"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LogoSquare from "@/components/ui/Logo/LogonSquare";
import Link from "next/link";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { ArrowLeftIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/apis/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

const SignInPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success(data.message);
      router.push(ROUTE_PATHS.HOME);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerMutation.mutate(data);
  }

  return (
    <div className="w-full">
      <Link href={ROUTE_PATHS.HOME} className="absolute top-10 left-10">
        <Button variant="default">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <div className="flex items-center justify-center flex-col gap-4">
        <LogoSquare />
        <h1 className=" text-2xl font-bold">Register to vui.coding</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-1/2 mx-auto mt-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>

      <div className=" text-sm gap-1 text-center mt-4">
        <span>Already have an account? </span>
        <Link href={ROUTE_PATHS.AUTH.SIGN_IN} className="text-button-primary font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
