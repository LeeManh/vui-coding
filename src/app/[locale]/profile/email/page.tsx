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
import { Badge } from "@/components/shared/Badge";

const ProfilePageEmail = () => {
  const t = useTranslations();

  const FormSchema = z.object({
    email: z
      .string()
      .nonempty({ message: t("Validation.required", { field: t("Profile.email") }) })
      .email({ message: t("Validation.email") }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
  }

  return (
    <div className="profile-container">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.email")}</div>
        <div className="text-caption">{t("Profile.emailDescription")}</div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-900 dark:text-gray-100">lemanhddt@gmail.com</span>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
              >
                Đã xác minh
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("Profile.changeEmail")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@your.domain" {...field} />
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

export default ProfilePageEmail;
