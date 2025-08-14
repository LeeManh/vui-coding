import React, { useState, useRef, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import { Input } from "../Input";
import { Badge } from "../Badge";

interface MultiSelectWithCreateProps {
  initialItems?: string[];
  selectedItems?: string[];
  onSelectionChange?: (items: string[]) => void;
  placeholder?: string;
  createText?: string;
  noResultsText?: string;
}

export const MultiSelectWithCreate: React.FC<MultiSelectWithCreateProps> = ({
  initialItems = [],
  selectedItems = [],
  onSelectionChange,
  placeholder = "Tìm kiếm hoặc tạo mới...",
  createText = "Tạo",
  noResultsText = "Không tìm thấy kết quả",
}) => {
  const [items, setItems] = useState<string[]>(initialItems);
  const [selected, setSelected] = useState<string[]>(selectedItems);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter items based on search term
  const filteredItems: string[] = items.filter(
    (item) => item.toLowerCase().includes(searchTerm.toLowerCase()) && !selected.includes(item)
  );

  // Check if search term matches any existing item
  const canCreate: boolean =
    searchTerm.trim() !== "" &&
    !items.some((item) => item.toLowerCase() === searchTerm.toLowerCase());

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  }, [selected, onSelectionChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string): void => {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    }
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleRemove = (itemToRemove: string): void => {
    setSelected(selected.filter((item) => item !== itemToRemove));
  };

  const handleCreate = (): void => {
    const newItem = searchTerm.trim();
    if (newItem && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setSelected([...selected, newItem]);
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!isOpen) return;

    const totalOptions = filteredItems.length + (canCreate ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < totalOptions - 1 ? prev + 1 : -1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : totalOptions - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          if (highlightedIndex < filteredItems.length) {
            handleSelect(filteredItems[highlightedIndex]);
          } else if (canCreate) {
            handleCreate();
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative">
        {/* Selected items and input */}
        <div className="min-h-10 w-full rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] flex items-center flex-wrap gap-x-1 gap-y-2">
          {/* Selected items */}
          {selected.map((item) => (
            <Badge key={item} closeAble onClose={() => handleRemove(item)} className="h-fit">
              {item}
            </Badge>
          ))}

          {/* Search input */}
          <div className="flex-1 min-w-20">
            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
                setHighlightedIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full text-sm p-0 h-full rounded-none"
              hideBorder
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredItems.length === 0 && !canCreate && searchTerm && (
              <div className="px-3 py-2 text-sm text-gray-500">{noResultsText}</div>
            )}

            {/* Existing items */}
            {filteredItems.map((item, index) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between ${
                  highlightedIndex === index ? "bg-blue-50" : ""
                }`}
              >
                <span>{item}</span>
                {selected.includes(item) && <Check size={16} className="text-blue-500" />}
              </button>
            ))}

            {/* Create new option */}
            {canCreate && (
              <button
                onClick={handleCreate}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 border-t ${
                  highlightedIndex === filteredItems.length ? "bg-blue-50" : ""
                }`}
              >
                <Plus size={16} className="text-green-500" />
                <span className="text-green-600">
                  {createText} &quot;{searchTerm}&quot;
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
