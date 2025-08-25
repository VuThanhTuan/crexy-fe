"use client"

import React, { useEffect, useRef } from "react"
import clsx from "clsx"

type ScrollSectionProps = {
	children: React.ReactNode
	className?: string
	threshold?: number
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, className, threshold = 0.2 }) => {
	const sectionRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current) return
		const element = sectionRef.current
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target)
					}
				}
			},
			{ threshold }
		)
		observer.observe(element)
		return () => observer.disconnect()
	}, [threshold])

	return (
		<section
			ref={sectionRef}
			className={clsx(
				"snap-section scroll-section transition-all duration-2000 ease-out",
				className
			)}
		>
			{children}
		</section>
	)
}


