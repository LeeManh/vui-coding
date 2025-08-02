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
  value?: Gender;
  onChange?: (value: Gender) => void;
}
export function SelectGender({ value, onChange }: SelectGenderProps) {
  const t = useTranslations();

  const [gender, setGender] = useState<Gender | undefined>(value);

  const handleChange = (value: Gender) => {
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
          {gender ? t(getGenderLabel(gender)) : t("Gender.select")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{t("Common.gender")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={gender}
          onValueChange={(value) => handleChange(value as Gender)}
        >
          <DropdownMenuRadioItem value={Gender.MALE}>
            {t(getGenderLabel(Gender.MALE))}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Gender.FEMALE}>
            {t(getGenderLabel(Gender.FEMALE))}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Gender.OTHER}>
            {t(getGenderLabel(Gender.OTHER))}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
