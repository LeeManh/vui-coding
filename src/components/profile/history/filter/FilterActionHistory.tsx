"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/shared/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { UserAction } from "@/constants/actions";
import { useTranslations } from "next-intl";
import { getActionLabel } from "@/lib/format";

export function FilterActionHistory() {
  const t = useTranslations();

  const [action, setAction] = React.useState(UserAction.ALL);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-full sm:w-[200px]">
          {t(getActionLabel(action))}
          <ChevronUp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuRadioGroup
          value={action}
          onValueChange={(value) => setAction(value as UserAction)}
        >
          <DropdownMenuRadioItem value={UserAction.ALL}>
            {t("UserAction.all")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.BOOKMARK}>
            {t("UserAction.bookmark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.DELETE_BOOKMARK}>
            {t("UserAction.deleteBookmark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.UPVOTE}>
            {t("UserAction.upvote")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.DOWNVOTE}>
            {t("UserAction.downvote")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.UNVOTE}>
            {t("UserAction.unvote")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.ACCEPT}>
            {t("UserAction.accept")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.DELETE}>
            {t("UserAction.delete")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.UNDO_UPVOTE}>
            {t("UserAction.undoUpvote")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={UserAction.UNDO_DOWNVOTE}>
            {t("UserAction.undoDownvote")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
