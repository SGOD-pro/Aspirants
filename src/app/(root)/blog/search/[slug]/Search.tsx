import { useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";

function Search() {
	const router = useRouter();
	const [input, setInput] = React.useState("");

	// Get the search item from the URL
	useEffect(() => {
		const searchItem = window.location.pathname.split("/").pop(); 
        if (searchItem) {   
            setInput(decodeURI(searchItem)); 
        }
	}, []);

	return (
		<form
			action=""
			className="flex w-full max-w-xl gap-4 m-auto"
			onSubmit={(e) => {
				e.preventDefault();
				router.push(`/blog/search/${input}`);
			}}
		>
			<input
				type="text"
				className="border border-theme px-4 py-3 rounded-full w-full bg-transparent outline-none"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button className="px-4 py-2 rounded-xl bg-theme text-white hover:bg-violet-800">
				Search
			</button>
		</form>
	);
}

export default memo(Search);
