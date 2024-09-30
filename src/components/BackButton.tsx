"use client"
import React from "react";
import { Button } from "./ui/button";
import {useRouteHistory} from "@/hooks/RoutesHistory";
import { Undo2 } from "lucide-react";
function BackButton() {
	// console.log(useRouteHistory());
	const { goBack } = useRouteHistory();
	return (
		<div className="fixed top-10 left-5 sm:left-10">
			<Button onClick={goBack} size={"icon"}>
				<Undo2 />
			</Button>
		</div>
	);
}

export default BackButton;
