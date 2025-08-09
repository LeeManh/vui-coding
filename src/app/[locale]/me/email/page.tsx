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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <Mail className="w-8 h-8 text-primary" />
          {t("Profile.email")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("Profile.emailDescription")}
        </p>
      </div>

      {/* Current Email Status */}
      <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
            <Shield className="w-5 h-5" />
            Email hiện tại
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                  lemanhddt@gmail.com
                </p>
                <p className="text-sm text-muted-foreground">Email chính của tài khoản</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700 px-3 py-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Đã xác minh
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-900/10 dark:border-orange-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-800 dark:text-orange-400">Lưu ý bảo mật</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Email này sẽ được sử dụng để nhận thông báo bảo mật và khôi phục mật khẩu. Hãy đảm
                bảo bạn có thể truy cập email này.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Email Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5" />
            Thay đổi email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t("Profile.changeEmail")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your.new.email@domain.com"
                          {...field}
                          className="pl-10 h-12 focus:ring-2 focus:ring-primary/20 border-2"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground mt-2">
                      Bạn sẽ nhận được email xác nhận để hoàn tất việc thay đổi
                    </p>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="w-full sm:w-40 h-11 border-2"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("Button.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-40 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t("Button.update")}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePageEmail;
