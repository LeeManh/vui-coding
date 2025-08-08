import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: CustomPaginationProps) => {
  const getVisiblePages = () => {
    if (totalPages === 1) return [1];

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  console.log("visiblePages", visiblePages); // [1, 1]?

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0 border-gray-300 text-gray-400 hover:bg-gray-50 rounded"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="outline"
              size="sm"
              disabled
              className="h-8 w-8 p-0 border-gray-300 text-gray-400 rounded"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={cn(
              "h-8 w-8 p-0 rounded border-2",
              isActive
                ? "border-blue-300 text-blue-700 bg-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            {page}
          </Button>
        );
      })}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0 border-gray-300 text-gray-400 hover:bg-gray-50 rounded"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
