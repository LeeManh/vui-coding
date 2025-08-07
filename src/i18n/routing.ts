import { DEFAULT_LOCALE, LOCALE_SUPPORT } from "@/constants/locale";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALE_SUPPORT,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});
