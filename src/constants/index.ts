export const compi = [
	{ header: "JEE Mains", subject: "Maths" },
	{ header: "NIMCET", subject: "Maths & Aptitude" },
	{ header: "JECA", subject: "Maths" },
	{ header: "Govt Exams", subject: "Aptitude & Reasoning" },
];
interface Board {
    name: string;
    subject: string;
}

interface SchoolCourse {
    header: string;
    boards: Board[];
}
export const school = [
	{
		header: "8",
		boards: { name: "CBSE", subject: "Maths, Science" },
	},
	{
		header: "8",
		boards:{ name: "ICSE", subject: "Maths, Chemistry, Physics" },
	},
	{
		header: "9",
		boards: { name: "ICSE", subject: "Maths, Science" },
	}, 
	{
		header: "9",
		boards: { name: "CBSE", subject: "Maths, Chemistry, Physics" },
	}, 
	{
		header: "10",
		boards: { name: "CBSE", subject: "Maths, Chemistry, Physics" },
	},
	{
		header: "10",
		boards: { name: "ICSE", subject: "Maths, Science" },
	},
	{
		header: "11",
		boards: { name: "Any", subject: "Maths" },
	},
	{
		header: "12",
		boards: { name: "Any", subject: "Maths" },
	},
];

export const undergraduate = [
	{
		header: "BSC",
		subject: "Math, Statistics",
	},
	{
		header: "BCA",
		subject: "Math, Statistics",
	},
];

export const specialCourses = [
	{ header: "Linear Algebra", subject: "Linear Algebra" },
	{ header: "Applied Statistics", subject: "Applied Statistics" },
];

// Normalizing all courses into one array
export const courses = [
	{
        type: "School",
        data: school.reduce<SchoolCourse[]>((acc, course) => {
            // Check if header already exists in `acc`
            const existing = acc.find(item => item.header === course.header);

            if (existing) {
                // If exists, push to `boards` array
                existing.boards.push(course.boards);
            } else {
                // Otherwise, create new entry
                acc.push({
                    header: course.header,
                    boards: [course.boards],
                });
            }

            return acc;
        }, []),
    },
	{
		type: "Undergraduate",
		data: undergraduate.map((course) => ({
			header: course.header,
			subject: course.subject,
		})),
	},
	{
		type: "Competitive",
		data: compi.map((course) => ({
			header: course.header,
			subject: course.subject,
		})),
	},
	{
		type: "Special",
		data: specialCourses.map((course) => ({
			header: course.header,
			subject: course.subject,
		})),
	},
];
