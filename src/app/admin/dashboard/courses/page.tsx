"use client";
import React, { memo, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FilePenLine, Plus, Trash2 } from "lucide-react";
import { coursesStore,CourseWithId } from "@/store/CoursesStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import Dialog from "@/components/Dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
const AddCourses = React.lazy(() => import("@/components/forms/courseForm"));
const Addsubject = React.lazy(() => import("@/components/forms/Addsubject"));
const AddUniversity = React.lazy(() => import("@/components/forms/AddUniversity"));

// Memoized TableRow component
const MemoizedTableRow = memo(({ course, deleteFunction }:{ course:CourseWithId, deleteFunction: (id:string) => void }) => {
  return (
    <TableRow key={course.uid}>
      <TableCell className="font-medium uppercase">{course.subject}</TableCell>
      <TableCell className=" uppercase">{course.department}</TableCell>
      <TableCell className=" uppercase">{course.university}</TableCell>
      <TableCell className="">{course.fees}</TableCell>
      <TableCell className="space-x-3">
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => deleteFunction(course.uid!)}
        >
          <Trash2 />
        </Button>
        <Dialog
          title="Add Course"
          content={
            <Suspense fallback={<Skeleton className="h-80" />}>
              <AddCourses defaultValue={course} id={course.uid}/>
            </Suspense>
          }
        >
          <Button
            variant={"destructive"}
            size={"icon"}
            className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-150"
          >
            <FilePenLine />
          </Button>
        </Dialog>
      </TableCell>
    </TableRow>
  );
});
MemoizedTableRow.displayName="MemoizedTableRow";
function AdminCourses() {
  const { courses, popCourses } = coursesStore((state) => ({
    courses: state.courses,
    popCourses: state.popCourses,
  }));

  const deleteFunction = async (id: string) => {
    const response = await popCourses(id);
    if (!response.success) {
      toast({
        title: "Error",
        description: `${response.error}` || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header>
        <Dialog
          title="Add Course"
          content={
            <Suspense fallback={<Skeleton className="h-80" />}>
              <AddCourses />
            </Suspense>
          }
        >
          <Button
            variant={"secondary"}
            className="flex gap-1 items-center font-bold"
          >
            Course <Plus />
          </Button>
        </Dialog>
        <Dialog
          title="Add subject"
          content={
            <Suspense fallback={<Skeleton className="h-36" />}>
              <Addsubject />
            </Suspense>
          }
        >
          <Button
            variant={"secondary"}
            className="flex gap-1 items-center font-bold"
          >
            Subject <Plus />
          </Button>
        </Dialog>
        <Dialog
          title="Add University"
          content={
            <Suspense fallback={<Skeleton className="h-56" />}>
              <AddUniversity />
            </Suspense>
          }
        >
          <Button
            variant={"secondary"}
            className="flex gap-1 items-center font-bold"
          >
            University <Plus />
          </Button>
        </Dialog>
      </Header>
      <Container>
        <div className="overflow-auto mt-5">
          <div className="border rounded-md max-h-[80vh] overflow-auto scrollbar">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Subject</TableHead>
                  <TableHead className="w-[100px]">Class</TableHead>
                  <TableHead className="w-[100px]">Board</TableHead>
                  <TableHead className="w-[100px]">Fees</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses &&
                  courses.map((course) => (
                    <MemoizedTableRow
                      key={course.uid}
                      course={course}
                      deleteFunction={deleteFunction}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AdminCourses;
