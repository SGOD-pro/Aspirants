import React,{memo,Suspense,lazy} from 'react'
const AddstudentForm = lazy(() => import("@/components/forms/AddstudentForm"));
import { StudentWithId } from "@/store/StudentsStore";
import Dialog from "@/components/Dialog";
import { Skeleton } from '@/components/ui/skeleton';

 const AddStudentButton = memo(
	({
		data,
		children,
	}: {
		data?: StudentWithId;
		children: React.ReactNode;
	}): React.ReactNode => {
		console.log(data);
		return (
			<Dialog
				content={
					<Suspense fallback={<Skeleton className="w-full h-96" />}>
						<AddstudentForm defaultValue={data} id={data?.uid} />
					</Suspense>
				}
				title="New Student"
			>
				{children}
			</Dialog>
		);
	}
);
AddStudentButton.displayName = "AddStudentButton";
export default AddStudentButton;