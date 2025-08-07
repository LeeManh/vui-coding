"use client";

import React from "react";
import { TitleSection } from "../shared/title-section";
import { useTranslations } from "next-intl";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";

const NewsletterSubscriptionSection = () => {
  const t = useTranslations();

  return (
    <div className="p-2">
      <TitleSection title={t("Common.newsletter")} />

      <div className="flex flex-col items-center justify-center space-y-3 mt-4">
        <p className="text-gray-600 text-sm">
          Stay updated with the latest news, articles, and resources, sent to your inbox weekly.
        </p>
        <form className="w-full max-w-md flex space-x-2">
          <Input type="email" placeholder="Enter your email" className="flex-1" />
          <Button type="submit">Subscribe</Button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionSection;
