import React from "react";
import { motion } from "motion/react";

interface DotProps {
	index: number;
	currentIndex: number;
	onClick: (index: number) => void;
}

const Dot: React.FC<DotProps> = ({ index, currentIndex, onClick }) => {
	const selected = index === currentIndex;

	return (
		<motion.div
			className="w-4 h-4 border border-rebe-purple-400 rounded-full m-2 flex justify-center items-center cursor-pointer"
			onClick={() => onClick(index)}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
		>
			<motion.div
				className="w-3 h-3 rounded-full bg-rebe-blue-500 z-20"
				animate={{
					scale: selected ? 1 : 0.5,
					opacity: selected ? 1 : 0.7,
				}}
				transition={{ duration: 0.2 }}
			/>
		</motion.div>
	);
};

interface SectionDotsProps {
	limit: number;
	currentIndex: number;
	onDotClick: (index: number) => void;
	className?: string;
}

export const SectionDots: React.FC<SectionDotsProps> = ({
	limit,
	currentIndex,
	onDotClick,
	className = "",
}) => {
	return (
		<div
			className={`fixed right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-50  ${className}`}
		>
			{/* 세로 라인 */}
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full" />

			{/* 도트들 */}
			<div className="flex flex-col items-center justify-center">
				{Array(limit)
					.fill("")
					.map((_, index) => (
						<Dot
							key={index}
							index={index}
							currentIndex={currentIndex}
							onClick={onDotClick}
						/>
					))}
			</div>
		</div>
	);
};
