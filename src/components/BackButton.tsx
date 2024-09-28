"use client"
import React from "react";
import { Button } from "./ui/button";
import {useRouteHistory} from "@/hooks/RoutesHistory";
import { Undo2 } from "lucide-react";
function BackButton() {
	// console.log(useRouteHistory());
	const { goBack } = useRouteHistory();
	return (
		<div>
			<Button onClick={goBack} size={"icon"}>
				<Undo2 />
			</Button>
		</div>
	);
}

export default BackButton;
