"use client";

import * as React from "react";

import { Button } from "@/components/shared/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { UserActionTarget } from "@/constants/actions";
import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { getActionTargetTypeLabel } from "@/lib/format";

export function FilterTypeHistory() {
  const t = useTranslations();
  const [type, setType] = React.useState(UserActionTarget.ALL);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-full sm:w-[200px]">
          {t(getActionTargetTypeLabel(type))}
          <ChevronUp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuRadioGroup
          value={type}
          onValueChange={(value) => setType(value as UserActionTarget)}
        >
          <DropdownMenuRadioItem value={UserActionTarget.ALL}>
            {t("UserActionTarget.all")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.POST}>
            {t("UserActionTarget.post")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.QUESTION}>
            {t("UserActionTarget.question")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.SERIES}>
            {t("UserActionTarget.series")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.ANSWER}>
            {t("UserActionTarget.answer")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.TAG}>
            {t("UserActionTarget.tag")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.COMMENT}>
            {t("UserActionTarget.comment")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionTarget.USER}>
            {t("UserActionTarget.user")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
