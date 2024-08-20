import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

function DialogComp({
	children,
	content,
	title,
}: {
	children: React.ReactNode;
	content: React.ReactNode;
	title?: string;
}) {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{content}</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default DialogComp;
