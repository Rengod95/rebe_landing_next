"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "./text-animate";
import { BlurFade } from "./blur-fade";

interface ChatMessage {
	id: number;
	type: "question" | "answer";
	content: string;
	delay: number;
	isTyping?: boolean;
}

const chatData: ChatMessage[] = [
	{
		id: 1,
		type: "question",
		content: "기존 AI 보정 앱과 뭐가 다른가요?",
		delay: 1.5,
	},
	{
		id: 2,
		type: "answer",
		content:
			"프리셋 없이 오로지 내 사진, 내가 원하는 사진, 단 두장으로 합성 가능해요!",
		delay: 2.5,
	},
	{
		id: 3,
		type: "question",
		content: "앱으로만 이용 가능한가요?",
		delay: 4,
	},
	{
		id: 4,
		type: "answer",
		content: "자체 API 개발을 통해 웹을 통한 B2B 솔루션으로 제공할 수 있어요",
		delay: 5,
	},
	{
		id: 5,
		type: "question",
		content: "레퍼런스 사진을 찾기 귀찮아요",
		delay: 6.5,
	},
	{
		id: 6,
		type: "answer",
		content:
			"트렌드를 반영하는 약 25,000 장 이상의 헤어, 메이크업 레퍼런스 사진을 자체 제공해요",
		delay: 7.5,
	},
];

export function ChatUISection() {
	const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		if (!isInView) return;

		for (const message of chatData) {
			setTimeout(() => {
				setVisibleMessages((prev) => [...prev, message.id]);
			}, message.delay * 1000);
		}
	}, [isInView]);

	return (
		<section
			className="h-screen relative overflow-hidden flex flex-col justify-center items-center pb-16 md:pb-24"
			data-section="chat-ui"
		>
			{/* 배경 패턴 */}
			<div className="absolute inset-0 opacity-70">
				<div className="absolute top-1/8 left-1/6 w-128 h-144 bg-gradient-to-br from-rebe-purple-400/70 to-rebe-pink-300/70 rounded-full blur-2xl " />
				<div className="absolute bottom-1/4 right-1/6 w-144 h-168 bg-gradient-to-br from-rebe-blue-400/70 to-rebe-purple-400 rounded-full blur-2xl" />
			</div>

			<div className="w-full mx-auto px-4 md:px-8 relative z-10 items-center justify-center">
				{/* 섹션 헤더 */}
				<div className="w-full text-center mb-12">
					<BlurFade delay={0.1} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-12 md:mb-8 xl:mb-16 font-light tracking-tight leading-normal text-rebe-slate-800 text-4xl lg:text-6xl"
						>
							REBE에 대해 더 알아보세요
						</TextAnimate>
					</BlurFade>
				</div>

				{/* 채팅 컨테이너 */}
				<div className="flex flex-1 flex-row justify-center max-w-4xl mx-auto ">
					<div className="md:px-8  max-w-2xl ">
						{/* 채팅 메시지들 */}
						<div className="space-y-6 md:space-y-8 lg:space-y-12">
							{chatData.map((message) => (
								<BlurFade
									key={message.id}
									delay={message.delay}
									inView={visibleMessages.includes(message.id)}
									className={cn(
										"flex",
										message.type === "question"
											? "justify-end"
											: "justify-start",
									)}
								>
									<div
										className={cn(
											"max-w-[80%] rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-2xl shadow-rebe-slate-300",
											message.type === "question"
												? " text-rebe-slate-800 bg-rebe-slate-50 ml-auto"
												: "bg-rebe-slate-900 border border-rebe-slate-300 text-rebe-slate-800 mr-auto",
										)}
									>
										{message.type === "answer" && (
											<div className="hidden md:flex items-center gap-2 mb-2">
												<div className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-rebe-blue-400 to-rebe-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
													R
												</div>
												<span className="text-lg font-extrabold text-rebe-slate-50">
													REBE
												</span>
											</div>
										)}
										<TextAnimate
											key={`message-${message.id}`}
											as="p"
											animation="slideRight"
											by="word"
											duration={0.8}
											className={cn(
												"text-lg md:text-lg tracking-tight font-bold",
												message.type === "question"
													? "text-rebe-slate-800"
													: "text-rebe-slate-50",
											)}
										>
											{message.content}
										</TextAnimate>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
