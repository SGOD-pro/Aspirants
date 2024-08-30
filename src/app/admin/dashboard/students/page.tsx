"use client";

import * as React from "react";
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { studentStore, StudentWithId } from "@/global/StudentsStore";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Loader from "@/components/layout/Loader";
import { IconEdit, IconTrash } from "@tabler/icons-react";

// Example data structure based on the provided schema

export const columns: ColumnDef<StudentWithId>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue("name")}</div>,
	},
	{
		accessorKey: "studentId",
		header: "Student ID",
		cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
	},
	{
		accessorKey: "subjects",
		header: "Subjects",
		cell: ({ row }) => {
			const subjects = row.getValue("subjects") as string[];
			return <div>{subjects.join(", ")}</div>;
		},
	},
	{
		accessorKey: "institutionName",
		header: "Institution Name",
		cell: ({ row }) => <div>{row.getValue("institutionName")}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className={`font-bold capitalize`}>
				<span
					className={`px-3 py-1 rounded-full ${
						row.getValue("status") ? "bg-emerald-700" : "bg-rose-700"
					}`}
				>
					{row.getValue("status") ? "Active" : "Inactive"}
				</span>
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="">
							<Button className="w-full hover:bg-cyan-600" variant={"outline"}>
								<IconEdit />
								<span className="">Update</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem className="">
							<Button className="w-full hover:bg-rose-600" variant={"outline"}>
								<IconTrash />
								<span className="">Delete</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex gap-3 items-center justify-around">
							{student.status ? "Deactivate" : "Activate"}
							<Switch checked={student.status} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function DataTableDemo() {
	const { data, fetchStudent } = studentStore((state) => ({
		data: state.students,
		fetchStudent: state.setAllStudents,
	}));
	const [loading, setLoading] = React.useState(false);
	async function fetchRecord() {
		await fetchStudent();
	}
	React.useEffect(() => {
		fetchRecord();
	}, []);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data: data || [],
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
			<div className="flex items-center py-4">
				<Input
					placeholder="Search by name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-2">
							Filter by Status <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{["pending", "processing", "success", "failed"].map((status) => (
							<DropdownMenuCheckboxItem
								key={status}
								checked={
									(
										table.getColumn("status")?.getFilterValue() as
											| string[]
											| undefined
									)?.includes(status) ?? false
								}
								onCheckedChange={(checked) => {
									const prevFilter =
										(table.getColumn("status")?.getFilterValue() as
											| string[]
											| undefined) ?? [];
									table
										.getColumn("status")
										?.setFilterValue(
											checked
												? [...prevFilter, status]
												: prevFilter.filter((s) => s !== status)
										);
								}}
							>
								{status}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="rounded-md border">
				{loading && (
					<div className="absolute w-full h-gull bg-slate-900/40">
						<Loader />
					</div>
				)}
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter className="bg-transparent">
						<div className="space-x-4  p-3 w-full">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
						</div>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
