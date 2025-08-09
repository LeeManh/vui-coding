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
import { Card } from "@/components/shared/Card";
import {
  KeyRound,
  Shield,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const ProfilePagePassword = () => {
  const t = useTranslations();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <KeyRound className="w-4 h-4" />
          {t("Profile.changePassword")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("Profile.passwordDescription")}</p>
      </div>

      {/* Security Guidelines - Compact */}
      <Card className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Yêu cầu mật khẩu
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Ít nhất 6 ký tự</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Có chữ và số</span>
          </div>
        </div>
      </Card>

      {/* Warning - Compact */}
      <Card className="p-3 border border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-900/10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
          <div>
            <p className="text-xs text-orange-700 dark:text-orange-300">
              Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại trên tất cả thiết bị.
            </p>
          </div>
        </div>
      </Card>

      {/* Form - Simplified */}
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">{t("Common.newPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                        {...field}
                        className="pr-10 h-9 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
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
                  <FormLabel className="text-sm">{t("Common.confirmPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        {...field}
                        className="pr-10 h-9 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons - Minimal */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                size="sm"
                className="h-8 px-3"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {t("Button.cancel")}
              </Button>
              <Button type="submit" size="sm" className="h-8 px-3">
                <Save className="w-3 h-3 mr-1" />
                {t("Button.update")}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePagePassword;
