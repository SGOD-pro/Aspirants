export const compi = [
	{ header: "JEE Mains", subject: "Maths" },
	{ header: "NIMCET", subject: "Maths & Aptitude" },
	{ header: "JECA", subject: "Maths" },
	{ header: "Govt Exams", subject: "Aptitude & Reasoning" },
];

export const school = [
	{
		header: "8",
		boards: [
			{ name: "CBSE", subject: "Maths, Science" },
			{ name: "ICSE", subject: "Maths, Chemistry, Physics" },
		],
	},
	{
		header: "9",
		boards: [
			{ name: "ICSE", subject: "Maths, Science" },
			{ name: "CBSE", subject: "Maths, Chemistry, Physics" },
		],
	},
	{
		header: "10",
		boards: [
			{ name: "ICSE", subject: "Maths, Science" },
			{ name: "CBSE", subject: "Maths, Chemistry, Physics" },
		],
	},
	{
		header: "11",
		boards: [{ name: "Any", subject: "Maths" }],
	},
	{
		header: "12",
		boards: [{ name: "Any", subject: "Maths" }],
	},
];

export const undergraduate = [
	{
		header: "Bsc",
		subject: "Math, Statistics",
	},
	{
		header: "Bca",
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
		data: school.map((course) => ({
			header: course.header,
			boards: course.boards,
		})),
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
