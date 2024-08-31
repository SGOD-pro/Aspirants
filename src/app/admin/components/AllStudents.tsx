"use client";

import React, {
	useEffect,
	useCallback,
	useMemo,
	useState,
	lazy,
	Suspense,
} from "react";
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
	flexRender,
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { studentStore, StudentWithId } from "@/global/StudentsStore";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

import Loader from "@/components/layout/Loader";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AddStudentButton } from "../dashboard/page";
import { toast } from "@/components/ui/use-toast";

const handleDelete = async (studentId: string) => {
	try {
		const result = await studentStore.getState().deleteStudent(studentId);
		if (result.success) {
			toast({
				title: "Success",
				description: "Student deleted successfully.",
			});
		} else {
			throw result.error;
		}
	} catch (error: any) {
		toast({
			title: "Error",
			description: `Failed to delete student: ${error.message}`,
		});
	}
};

const columns: ColumnDef<StudentWithId>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<CaretSortIcon className="ml-2 h-4 w-4" />
			</Button>
		),
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
			<div className="font-bold capitalize">
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
				<Popover >
					<PopoverTrigger asChild>
						<Button variant="ghost" size={"icon"}>
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-40 p-0">
						<div className="space-y-3">
							<AddStudentButton data={student}>
								<Button
									className="w-full hover:bg-cyan-600"
									variant="outline"
									onClick={(e) => e.stopPropagation()}
								>
									<IconEdit />
									<span>Update</span>
								</Button>
							</AddStudentButton>
							<Button
								className="w-full hover:bg-rose-600"
								variant="outline"
								onClick={() => handleDelete(student.uid)}
							>
								<IconTrash />
								<span>Delete</span>
							</Button>
							<div className="flex gap-3 items-center justify-around">
								{student.status ? "Deactivate" : "Activate"}
								<Switch checked={student.status} />
							</div>
						</div>
					</PopoverContent>
				</Popover>
			);
		},
	},
];

// Memoize Table Row component
const MemoizedTableRow = React.memo(
	({ row }: { row: any }) => (
		<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
			{row.getVisibleCells().map((cell: any) => (
				<TableCell key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	),
	(prevProps, nextProps) => prevProps.row === nextProps.row
);
MemoizedTableRow.displayName = "MemoizedTableRow";

export default function StudentTable() {
	const { data, fetchStudent } = studentStore((state) => ({
		data: state.students,
		fetchStudent: state.setAllStudents,
	}));
	const [loading, setLoading] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	useEffect(() => {
		const fetchRecord = async () => {
			setLoading(true);
			await fetchStudent();
			setLoading(false);
		};
		fetchRecord();
	}, [fetchStudent]);

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

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			table.getColumn("name")?.setFilterValue(event.target.value);
		},
		[table]
	);

	const handleStatusFilterChange = useCallback(
		(checked: boolean, status: string) => {
			const prevFilter =
				(table.getColumn("status")?.getFilterValue() as string[]) || [];
			table
				.getColumn("status")
				?.setFilterValue(
					checked
						? [...prevFilter, status]
						: prevFilter.filter((s) => s !== status)
				);
		},
		[table]
	);

	const renderedRows = useMemo(
		() =>
			table
				.getRowModel()
				.rows.map((row) => <MemoizedTableRow key={row.id} row={row} />),
		[table.getRowModel().rows]
	);

	return (
		<div className="w-full relative px-3">
			<div className="flex items-center py-4">
				<Input
					placeholder="Search by name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={handleSearchChange}
					className="max-w-sm"
				/>
				<DropdownMenu >
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-2" disabled>
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
								onCheckedChange={(checked) =>
									handleStatusFilterChange(checked, status)
								}
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
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Suspense fallback={<Loader />}>
				{loading ? (
					<Loader />
				) : (
					<div className="rounded-md border max-w-full overflow-x-auto">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows.length ? (
									renderedRows
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
						</Table>
					</div>
				)}
			</Suspense>
		</div>
	);
}
