"use client";

import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { LogoSquare } from "@/components/shared/logo";
import Link from "next/link";
import { ROUTE_PATHS } from "@/constants/route-paths";
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
} from "@/components/shared/Form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

const FormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignInPage = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setAuth({ accessToken, refreshToken });
      toast.success(data.message);
      router.push(ROUTE_PATHS.HOME);
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    signInMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <Link href={ROUTE_PATHS.HOME} className="absolute top-10 left-10">
        <Button variant="default">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <div className="flex items-center justify-center flex-col gap-4">
        <LogoSquare />
        <h1 className=" text-2xl font-bold">Sign in to vui.coding</h1>
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
                  <Input type="text" placeholder="Email" {...field} />
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
          <Button type="submit" className="w-full" disabled={signInMutation.isPending}>
            Sign in
          </Button>
        </form>
      </Form>

      <div className=" text-sm gap-1 text-center mt-4">
        <span>First time here? </span>
        <Link href={ROUTE_PATHS.AUTH.REGISTER} className="text-button-primary font-medium">
          Register
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
