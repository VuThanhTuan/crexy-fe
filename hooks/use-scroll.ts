"use client"
import { useState, useEffect, RefObject } from 'react'

export const useScroll = (scrollContainerRef?: RefObject<HTMLElement>) => {
    const [scrollY, setScrollY] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        if (!scrollContainerRef?.current) {
            return
        }

        const handleScroll = () => {
            const currentScrollY = scrollContainerRef.current!.scrollTop
            setScrollY(currentScrollY)
            setIsScrolled(currentScrollY > 50)
        }

        const scrollElement = scrollContainerRef.current
        scrollElement.addEventListener('scroll', handleScroll, { passive: true })
        
        // Call once to set initial state
        handleScroll()

        return () => {
            scrollElement.removeEventListener('scroll', handleScroll)
        }
    }, [scrollContainerRef])

    return { scrollY, isScrolled }
}
