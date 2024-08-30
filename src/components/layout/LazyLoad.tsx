import React, { useState, useEffect, useRef } from "react";

interface LazyLoadProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, fallback }) => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 } // Adjust this threshold based on when you want to start loading
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) observer.disconnect();
		};
	}, []);

	return (
		<div ref={ref}>
			{isVisible ? children : fallback}
		</div>
	);
};

export default LazyLoad;
