import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust the import based on your project's structure
import { Trash } from "lucide-react"; // Adjust the icon import based on your icon package
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
interface BlogCardProps {
	blog: {
		id: string;
		data: {
			title: string;
			description: string;
			image: string;
		};
	};
	userPrefs?: {
		role: string | null; // Allow `null` value for role
	} | null;
	deleteBlogHandler?: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
	blog,
	userPrefs,
	deleteBlogHandler,
}) => {
	return (
		<CardContainer className="inter-var h-full" key={blog.data.title}>
			<CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-theme/10 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto rounded-xl p-6 border flex flex-col justify-between h-full">
				<CardItem
					translateZ="50"
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{blog.data.title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
				>
					{blog.data.description}
				</CardItem>
				<CardItem translateZ="100" className="w-full mt-4">
					<Image
						src={blog.data.image}
						height="700"
						width="700"
						className="h-60 w-full object-fill rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</CardItem>
				<div className="flex justify-end items-center mt-20 gap-5">
					{userPrefs?.role === "admin" && deleteBlogHandler && (
						<CardItem translateZ={20} as="button">
							<Button
								variant={"destructive"}
								size={"icon"}
								className="px-4 py-2 h-fit w-fit"
								onClick={() => deleteBlogHandler(blog.id)}
							>
								<Trash className="h-4 w-4" />
							</Button>
						</CardItem>
					)}
					<CardItem
						translateZ={20}
						as="button"
						className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
					>
						<Link href={`/blog/${blog.id}`}>Read More</Link>
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	);
};

export default BlogCard;
