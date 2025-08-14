import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  maxLength?: number;
  showCharCount?: boolean;
  charCountClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, showCharCount = false, charCountClassName, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    React.useEffect(() => {
      if (props.value) {
        setCharCount(String(props.value).length);
      }
    }, [props.value]);

    return (
      <div className="relative">
        <textarea
          ref={ref}
          data-slot="textarea"
          maxLength={maxLength}
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showCharCount && "pb-6",
            className
          )}
          {...props}
          onChange={handleChange}
        />
        {showCharCount && (
          <div
            className={cn(
              "absolute bottom-2 right-3 text-xs text-muted-foreground",
              maxLength && charCount > maxLength * 0.8 && "text-warning",
              maxLength && charCount >= maxLength && "text-destructive",
              charCountClassName
            )}
          >
            {charCount}
            {maxLength ? `/${maxLength}` : ""} ký tự
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
