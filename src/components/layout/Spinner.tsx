import React from "react";
import "./spinner.css";
function Spinner() {
	return (
		<div className="">
			<svg className="container" viewBox="0 0 20 20" height="20" width="20">
				<circle
					className="track"
					cx="20"
					cy="20"
					r="17.5"
					pathLength="100"
					stroke-width="5px"
					fill="none"
				/>
				<circle
					className="car"
					cx="20"
					cy="20"
					r="17.5"
					pathLength="100"
					stroke-width="5px"
					fill="none"
				/>
			</svg>
		</div>
	);
}

export default Spinner;
