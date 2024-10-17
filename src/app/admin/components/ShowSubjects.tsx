import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { coursesStore } from "@/store/CoursesStore";
import { toast } from "@/components/ui/use-toast";

function ShowSubjects() {
	const { deleteSubject, subjects } = coursesStore((state) => ({
		subjects: state.subjects,
		deleteSubject: state.popSubjects,
	}));
	const deleteSub = async (id: string) => {
		const res = await deleteSubject(id);
		if (res.error) {
			toast({
				title: "Error",
				description: res.error.message || "Something went wrong",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="border rounded-md scrollbar max-h-[75dvh] overflow-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="">Subject</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subjects?.map((invoice) => (
						<TableRow key={invoice.name}>
							<TableCell className="font-medium">{invoice.name}</TableCell>
							<TableCell className="text-right">
								<Button
									variant={"destructive"}
									size={"icon"}
									onClick={() => deleteSub(invoice.uid!)}
								>
									<Trash size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
export default ShowSubjects;
