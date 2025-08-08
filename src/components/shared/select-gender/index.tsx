import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { Button } from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { Gender } from "@/constants/user";
import { getGenderLabel } from "@/lib/format";
import { useTranslations } from "next-intl";

interface SelectGenderProps {
  value?: string;
  onChange?: (value: string) => void;
  placeHolder?: string;
}
export function SelectGender({ value, onChange, placeHolder }: SelectGenderProps) {
  const t = useTranslations();

  const [gender, setGender] = useState<string | undefined>(value);

  const handleChange = (value: string) => {
    setGender(value);
    onChange?.(value);
  };

  useEffect(() => {
    setGender(value);
  }, [value]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start">
          {gender ? t(getGenderLabel(+gender)) : placeHolder ?? t("Gender.select")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{t("Gender.select")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={String(gender)}
          onValueChange={(value: string) => handleChange(value)}
        >
          <DropdownMenuRadioItem value={String(Gender.MALE)}>
            {t(getGenderLabel(Gender.MALE))}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={String(Gender.FEMALE)}>
            {t(getGenderLabel(Gender.FEMALE))}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={String(Gender.OTHER)}>
            {t(getGenderLabel(Gender.OTHER))}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
