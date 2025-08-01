"use client";

import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/shared/Button";

const FormSchema = z.object({
  username: z.string(),
  displayName: z.string(),
  birthday: z.string(),
  gender: z.string(),
});

const ProfileInfoPage = () => {
  const t = useTranslations();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      displayName: "",
      birthday: "",
      gender: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="border p-4 rounded-md max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.personalInfo")}</div>
        <div className="text-caption">{t("Profile.description")}</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Common.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Common.username")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("Common.displayName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Common.displayName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 bg-red-400l">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("Common.birthday")}</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("Common.gender")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Common.gender")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              {t("Button.cancel")}
            </Button>
            <Button type="submit">{t("Button.update")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoPage;
