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
import { useAuth } from "@/contexts/auth-context";
import { UploadAvatar } from "@/components/shared/upload-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/apis/users.api";
import { toast } from "sonner";
import { upload } from "@/apis/media.api";
import { QUERY_KEYS } from "@/constants/query-keys";

const defaultValues = {
  avatar: null,
  username: "",
  displayName: "",
  birthday: "",
  gender: "",
};

const ProfileInfoPage = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const FormSchema = z.object({
    avatar: z
      .union([z.string(), z.instanceof(File)])
      .nullable()
      .optional(),
    username: z.string(),
    displayName: z.string().min(3).optional(),
    birthDay: z.date().optional(),
    gender: z.string().nullable().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateMeMutation = useMutation({ mutationFn: updateMe });
  const uploadMediaMutation = useMutation({ mutationFn: upload });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, avatar, ...rest } = data;

    let avatarUrl: string | undefined;

    const isAvatarChanged = avatar && typeof avatar !== "string" && avatar instanceof File;
    if (isAvatarChanged) {
      const { data } = await uploadMediaMutation.mutateAsync(avatar);
      avatarUrl = data.url;
    }

    await updateMeMutation.mutateAsync(
      {
        ...rest,
        birthDay: rest.birthDay ? rest.birthDay.toISOString() : undefined,
        gender: rest.gender ? Number(rest.gender) : undefined,
        avatar: avatarUrl,
      },
      {
        onSuccess: () => {
          toast.success(t("messages.updateSuccess"));
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ME.PROFILE] });
        },
      }
    );
  }

  // set default value from username
  useEffect(() => {
    if (!user) return;

    form.setValue("username", user.username);
    form.setValue("avatar", user.avatar);
    form.setValue("displayName", user.displayName ?? undefined);
    form.setValue("birthDay", user.birthDay ? new Date(user.birthDay) : undefined);
    form.setValue("gender", user.gender ? String(user.gender) : undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                <FormLabel>{t("Common.displayName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("Common.birthday")}</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      placeholder=""
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
                  <FormLabel>{t("Common.gender")}</FormLabel>
                  <FormControl>
                    <SelectGender
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeHolder=""
                    />
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
                  username: form.getValues("username"),
                  avatar: form.getValues("avatar"),
                  displayName: form.getValues("displayName"),
                  birthDay: form.getValues("birthDay"),
                  gender: form.getValues("gender"),
                })
              }
              className="w-32"
            >
              {t("Button.cancel")}
            </Button>
            <Button
              type="submit"
              isLoading={uploadMediaMutation.isPending || updateMeMutation.isPending}
              className="w-32"
            >
              {t("Button.update")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoPage;
