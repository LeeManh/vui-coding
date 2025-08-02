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
import { UserActionType } from "@/constants/actions";
import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { getActionTypeLabel } from "@/lib/format";

export function FilterTypeHistory() {
  const t = useTranslations();
  const [type, setType] = React.useState(UserActionType.ALL);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-full sm:w-[200px]">
          {t(getActionTypeLabel(type))}
          <ChevronUp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuRadioGroup
          value={type}
          onValueChange={(value) => setType(value as UserActionType)}
        >
          <DropdownMenuRadioItem value={UserActionType.ALL}>
            {t("UserActionType.all")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.POST}>
            {t("UserActionType.post")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.QUESTION}>
            {t("UserActionType.question")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.SERIES}>
            {t("UserActionType.series")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.ANSWER}>
            {t("UserActionType.answer")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.TAG}>
            {t("UserActionType.tag")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.COMMENT}>
            {t("UserActionType.comment")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserActionType.USER}>
            {t("UserActionType.user")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
