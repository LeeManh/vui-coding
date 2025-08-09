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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import DatePicker from "@/components/shared/date-picker/date-picker";
import { SelectGender } from "@/components/shared/select-gender";
import { useAuth } from "@/contexts/auth-context";
import { UploadAvatar } from "@/components/shared/upload-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/apis/users.api";
import { toast } from "sonner";
import { upload } from "@/apis/media.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import { User, Save, RotateCcw } from "lucide-react";

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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t("Profile.personalInfo")}</h1>
        <p className="text-muted-foreground text-lg">{t("Profile.description")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Avatar Section */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <User className="w-5 h-5" />
                Ảnh đại diện
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
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
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="w-5 h-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t("Common.username")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("Common.username")}
                          {...field}
                          disabled
                          className="bg-muted/50"
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
                      <FormLabel className="text-base font-medium">
                        {t("Common.displayName")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên hiển thị của bạn"
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t("Common.birthday")}
                      </FormLabel>
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
                      <FormLabel className="text-base font-medium">{t("Common.gender")}</FormLabel>
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
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
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
                  className="w-full sm:w-40 h-11 border-2"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t("Button.cancel")}
                </Button>
                <Button
                  type="submit"
                  isLoading={updateMeMutation.isPending}
                  className="w-full sm:w-40 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t("Button.update")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoPage;
