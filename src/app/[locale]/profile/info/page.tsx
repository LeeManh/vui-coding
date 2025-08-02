"use client";

import React, { useEffect } from "react";
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
import { z } from "zod";
import { Button } from "@/components/shared/Button";
import DatePicker from "@/components/shared/date-picker/date-picker";
import { SelectGender } from "@/components/shared/select-gender";
import { Gender } from "@/constants/user";
import { useAuth } from "@/contexts/auth-context";
import { UploadAvatar } from "@/components/shared/upload-avatar";

const defaultValues = {
  avatar: null,
  username: "",
  displayName: "",
  birthday: undefined,
  gender: undefined,
};

const ProfileInfoPage = () => {
  const t = useTranslations();
  const { user } = useAuth();

  const FormSchema = z.object({
    avatar: z.string().nullable().optional(),
    username: z
      .string()
      .min(1, { message: t("Validation.required", { field: t("Common.username") }) }),
    displayName: z
      .string()
      .min(1, { message: t("Validation.required", { field: t("Common.displayName") }) }),
    birthday: z.date({
      message: t("Validation.required", { field: t("Common.birthday") }),
    }),
    gender: z.enum(Object.values(Gender), {
      message: t("Validation.required", { field: t("Common.gender") }),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  // set default value from username
  useEffect(() => {
    if (!user) return;

    form.setValue("username", user.username);
    form.setValue("avatar", user.avatar);
  }, [user, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
  }

  return (
    <div className="profile-container">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.personalInfo")}</div>
        <div className="text-caption">{t("Profile.description")}</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormControl>
                  <UploadAvatar avatar={field.value} onChange={field.onChange} />
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
                <FormLabel>{t("Common.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Common.username")} {...field} disabled />
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
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("Common.birthday")}</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                    />
                  </FormControl>
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
                    <SelectGender value={field.value as Gender} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                form.reset({
                  ...defaultValues,
                  username: form.getValues("username"),
                  avatar: user?.avatar ?? null,
                })
              }
            >
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
