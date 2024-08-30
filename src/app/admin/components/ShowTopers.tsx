import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toperStore } from "@/global/Topers";
import Image from "next/image";

function ShowTopers() {
	const { topers, deleteToper } = toperStore((state) => ({
		topers: state.topers,
		deleteToper: state.deleteToper
	}));
	const deleteFunction = async (id: string) => {
		const response = await deleteToper(id);
		if (!response.success) {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="rounded-lg border max-h-[80dvh] overflow-auto">
			<Table className="">
				<TableHeader>
					<TableRow>
						<TableHead className="">Name</TableHead>
						<TableHead className="w-[100px] text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{topers &&
						topers.map((std) => (
							<TableRow key={std.uid}>
								<TableCell className="font-medium uppercase flex items-center gap-3">
									<div className="w-10 h-10 rounded-full overflow-hidden">
										<Image
											src={std.photoURL || "/girl2.jpg"}
											alt="A"
											width={100}
											height={100}
                                            className="object-cover h-full w-full"
										/>
									</div>
									{std.name}
								</TableCell>
					
								<TableCell className="text-right">
									<Button
										variant={"destructive"}
										size={"icon"}
										onClick={() => deleteFunction(std.uid!)}
									>
										<Trash2 />
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}

export default ShowTopers;
