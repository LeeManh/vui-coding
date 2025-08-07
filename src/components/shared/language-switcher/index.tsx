"use client";

import React from "react";
import { Button } from "../Button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { useTranslations } from "use-intl";
import Image from "next/image";
import images from "@/assets/images";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {locale === "en" ? (
            <Image
              src={images.en}
              alt="English"
              width={20}
              height={20}
              className="w-4 h-4 object-cover"
            />
          ) : (
            <Image
              src={images.vn}
              alt="Vietnamese"
              width={20}
              height={20}
              className="w-4 h-4 object-cover"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={locale} onValueChange={switchLanguage}>
          <DropdownMenuRadioItem value="vi">
            <Image
              src={images.vn}
              alt="Vietnamese"
              width={20}
              height={20}
              className="w-4 h-4 object-cover"
            />
            {t("vietnamese")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">
            <Image
              src={images.en}
              alt="English"
              width={20}
              height={20}
              className="w-4 h-4 object-cover"
            />
            {t("english")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
