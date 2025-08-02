"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, ExternalLink } from "lucide-react";

import { Button } from "@/components/shared/Button";
import { Checkbox } from "@/components/shared/Checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { Input } from "@/components/shared/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/Table";

const data: ActivityHistory[] = [
  {
    id: "1",
    date: "thg 7 25, 3:32 CH",
    activity: "Hoàn tác/Downvote",
    type: "Bài viết",
    title: "Giới thiệu Reactjs",
  },
  {
    id: "2",
    date: "thg 7 25, 3:31 CH",
    activity: "Upvote",
    type: "Bài viết",
    title: "Giới thiệu Reactjs",
  },
  {
    id: "3",
    date: "thg 6 2, 2024 5:26 CH",
    activity: "Upvote",
    type: "Bài viết",
    title: "Hiểu thị trường để hack lương ngành IT từ năm nhất",
  },
  {
    id: "4",
    date: "thg 6 1, 2024 8:33 CH",
    activity: "Upvote",
    type: "Bài viết",
    title: "Authentication nâng cao trong SPA (React/Vue) dùng JWT kết hợp Cookie",
  },
  {
    id: "5",
    date: "thg 5 6, 2024 2:06 CH",
    activity: "Upvote",
    type: "Bài viết",
    title: "Repository Pattern trong Laravel",
  },
  {
    id: "6",
    date: "thg 4 7, 2023 5:12 CH",
    activity: "Downvote",
    type: "Bài viết",
    title: "Lexical Scope trong JS",
  },
  {
    id: "7",
    date: "thg 2 23, 2023 10:5x SA",
    activity: "Upvote",
    type: "Bài viết",
    title: "8 kiểu cấu trúc dữ liệu mà mọi lập trình viên cần phải biết.",
  },
  {
    id: "8",
    date: "thg 2 22, 2023 9:18 CH",
    activity: "Downvote",
    type: "Bài viết",
    title: "Hooks New React Feature",
  },
  {
    id: "9",
    date: "thg 2 22, 2023 8:07 CH",
    activity: "Bookmark",
    type: "Bài viết",
    title: "Lập trình hướng đối tượng OOP",
  },
  {
    id: "10",
    date: "thg 2 22, 2023 8:07 CH",
    activity: "Upvote",
    type: "Bài viết",
    title: "Lập trình hướng đối tượng OOP",
  },
];

export type ActivityHistory = {
  id: string;
  date: string;
  activity: string;
  type: string;
  title: string;
};

export const columns: ColumnDef<ActivityHistory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày (19)
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "activity",
    header: "Hoạt Động",
    cell: ({ row }) => <div>{row.getValue("activity")}</div>,
  },
  {
    accessorKey: "type",
    header: "Kiểu",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    id: "actions",
    header: "Hành động",
    enableHiding: false,
    cell: ({ row }) => {
      const activity = row.original;

      return (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      );
    },
  },
];

function HistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Lọc theo tiêu đề..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} trong{" "}
          {table.getFilteredRowModel().rows.length} hàng được chọn.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Tiếp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;
