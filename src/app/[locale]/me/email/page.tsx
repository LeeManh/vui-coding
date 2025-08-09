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
import { Card } from "@/components/shared/Card";
import { Mail, Shield, Save, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

const ProfilePageEmail = () => {
  const t = useTranslations();

  const FormSchema = z.object({
    email: z
      .string()
      .nonempty({ message: t("Validation.required", { field: t("Profile.email") }) })
      .email({ message: t("Validation.invalidEmail") }),
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
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {t("Profile.email")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("Profile.emailDescription")}</p>
      </div>

      {/* Current Email - Compact */}
      <Card className="p-4 border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-green-800 dark:text-green-400">
          <Shield className="w-4 h-4" />
          Email hiện tại
        </h3>
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                lemanhddt@gmail.com
              </p>
              <p className="text-xs text-muted-foreground">Email chính</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700 px-2 py-1 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đã xác minh
          </Badge>
        </div>
      </Card>

      {/* Security Notice - Compact */}
      <Card className="p-3 border border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-900/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-400">
              Lưu ý bảo mật
            </h3>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              Email này dùng để nhận thông báo bảo mật và khôi phục mật khẩu.
            </p>
          </div>
        </div>
      </Card>

      {/* Change Email Form - Simplified */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Thay đổi email
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">{t("Profile.changeEmail")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="your.new.email@domain.com"
                        {...field}
                        className="pl-10 h-9 text-sm"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Bạn sẽ nhận email xác nhận để hoàn tất thay đổi
                  </p>
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

export default ProfilePageEmail;
