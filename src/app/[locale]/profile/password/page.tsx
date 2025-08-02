"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/Form";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

const ProfilePagePassword = () => {
  const t = useTranslations();

  const FormSchema = z
    .object({
      password: z
        .string()
        .nonempty({ message: t("Validation.required", { field: t("Common.newPassword") }) })
        .min(6, { message: t("Validation.minLength", { field: t("Common.newPassword"), min: 6 }) }),
      confirmPassword: z
        .string()
        .nonempty({ message: t("Validation.required", { field: t("Common.confirmPassword") }) })
        .min(6, {
          message: t("Validation.minLength", {
            field: t("Common.confirmPassword"),
            min: 6,
          }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Validation.passwordMissMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
  }

  return (
    <div className="profile-container">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.changePassword")}</div>
        <div className="text-caption">{t("Profile.passwordDescription")}</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("Common.newPassword")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t("Common.newPassword")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("Common.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t("Common.confirmPassword")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              {t("Button.cancel")}
            </Button>
            <Button type="submit">{t("Button.update")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePagePassword;
