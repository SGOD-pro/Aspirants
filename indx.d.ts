interface Course {
	header: string;
	subject: string;
	board?: string;
}

interface Courses {
	type: string;
	data: Course[];
}

interface BlogData {
	title: string;
	description: string;
    image:string;
	slug: string;
	date: string;
	tags?: string[]; // Optional field
	[key: string]: any; // Allow additional optional fields
}