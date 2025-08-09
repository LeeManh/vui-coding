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
import { Card } from "@/components/shared/Card";
import DatePicker from "@/components/shared/date-picker/date-picker";
import { SelectGender } from "@/components/shared/select-gender";
import { useAuth } from "@/contexts/auth-context";
import { UploadAvatar } from "@/components/shared/upload-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/apis/users.api";
import { toast } from "sonner";
import { upload } from "@/apis/media.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Save, RotateCcw } from "lucide-react";

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

    await updateMeMutation.mutateAsync(
      {
        ...rest,
        birthDay: rest.birthDay ? rest.birthDay.toISOString() : undefined,
        gender: rest.gender ? Number(rest.gender) : undefined,
        avatar: avatar as string | null,
      },
      {
        onSuccess: () => {
          toast.success(t("messages.updateSuccess"));
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ME.PROFILE] });
        },
      }
    );
  }

  // set default value from username on first render
  useEffect(() => {
    if (!user?.id) return;

    form.setValue("username", user.username);
    form.setValue("avatar", user.avatar);
    form.setValue("displayName", user.displayName ?? undefined);
    form.setValue("birthDay", user.birthDay ? new Date(user.birthDay) : undefined);
    form.setValue("gender", user.gender ? String(user.gender) : undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground">{t("Profile.personalInfo")}</h1>
        <p className="text-sm text-muted-foreground">{t("Profile.description")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar Section - Compact */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadAvatar
                        avatar={field.value}
                        isLoading={uploadMediaMutation.isPending}
                        onChange={async (value) => {
                          if (value && typeof value === "object" && value instanceof File) {
                            const { data } = await uploadMediaMutation.mutateAsync(value);
                            field.onChange(data.url);
                          } else {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h3 className="text-sm font-medium">Ảnh đại diện</h3>
                <p className="text-xs text-muted-foreground">Nhấp để thay đổi</p>
              </div>
            </div>
          </Card>

          {/* Personal Information - Simplified */}
          <Card className="p-4 space-y-4">
            <h3 className="text-sm font-medium border-b border-gray-200 dark:border-gray-800 pb-2">
              Thông tin cá nhân
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">{t("Common.username")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("Common.username")}
                          {...field}
                          disabled
                          className="bg-muted/50 text-sm h-9"
                        />
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
                      <FormLabel className="text-sm">{t("Common.displayName")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên hiển thị" {...field} className="text-sm h-9" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">{t("Common.birthday")}</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          placeholder="Chọn ngày sinh"
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
                    <FormItem>
                      <FormLabel className="text-sm">{t("Common.gender")}</FormLabel>
                      <FormControl>
                        <SelectGender
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeHolder="Chọn giới tính"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons - Minimal */}
          <div className="flex justify-end gap-2 pt-2">
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
              size="sm"
              className="h-8 px-3"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              {t("Button.cancel")}
            </Button>
            <Button
              type="submit"
              isLoading={updateMeMutation.isPending}
              size="sm"
              className="h-8 px-3"
            >
              <Save className="w-3 h-3 mr-1" />
              {t("Button.update")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoPage;
