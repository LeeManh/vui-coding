import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

export const SearchInput = ({
  placeholder = "Tìm kiếm...",
  onSearch,
  className,
  defaultValue = "",
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleSearch = () => {
    onSearch?.(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("flex w-full max-w-2xs", className)}>
      <div className="relative flex-1">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="rounded-r-none w-full"
        />
      </div>
      <Button onClick={handleSearch} className="rounded-l-none" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};
