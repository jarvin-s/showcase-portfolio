'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image, { ImageProps } from 'next/image'

interface ImageHoverProps
    extends Omit<ImageProps, 'onMouseMove' | 'onMouseLeave' | 'onMouseEnter'> {
    movementIntensity?: number
    /** Renders a small copy of the image fixed to the viewport that tracks the pointer (direct DOM updates, no transition lag). */
    cursorFollow?: boolean
    /** Max width of the follower preview in CSS pixels (height uses 16/9). */
    cursorFollowMaxWidthPx?: number
    cursorFollowOffsetPx?: { x: number; y: number }
}

export function ImageHover({
    movementIntensity = 15,
    className = '',
    cursorFollow = false,
    cursorFollowMaxWidthPx = 168,
    cursorFollowOffsetPx = { x: 18, y: 18 },
    ...imageProps
}: ImageHoverProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const lastPointerRef = useRef({ x: 0, y: 0 })
    const [transform, setTransform] = useState({ x: 0, y: 0 })
    const [followerVisible, setFollowerVisible] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const applyFollowerTransform = useCallback(
        (clientX: number, clientY: number) => {
            const el = followerRef.current
            if (!el) return
            const ox = cursorFollowOffsetPx.x
            const oy = cursorFollowOffsetPx.y
            el.style.transform = `translate3d(${clientX + ox}px, ${clientY + oy}px, 0)`
        },
        [cursorFollowOffsetPx.x, cursorFollowOffsetPx.y]
    )

    useLayoutEffect(() => {
        if (!cursorFollow || !followerVisible) return
        const { x, y } = lastPointerRef.current
        applyFollowerTransform(x, y)
    }, [cursorFollow, followerVisible, applyFollowerTransform])

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        lastPointerRef.current = { x: e.clientX, y: e.clientY }
        if (cursorFollow) setFollowerVisible(true)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        lastPointerRef.current = { x: e.clientX, y: e.clientY }

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) / rect.width
        const deltaY = (e.clientY - centerY) / rect.height

        setTransform({
            x: -deltaX * movementIntensity,
            y: -deltaY * movementIntensity,
        })

        if (cursorFollow) {
            applyFollowerTransform(e.clientX, e.clientY)
        }
    }

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 })
        if (cursorFollow) setFollowerVisible(false)
    }

    const followerHeight = Math.round((cursorFollowMaxWidthPx * 9) / 16)

    const follower =
        cursorFollow && mounted && followerVisible ? (
            <div
                ref={followerRef}
                className='pointer-events-none fixed left-0 top-0 z-[200] will-change-transform'
                style={{
                    width: cursorFollowMaxWidthPx,
                    height: followerHeight,
                }}
            >
                <Image
                    src={imageProps.src}
                    alt=''
                    width={cursorFollowMaxWidthPx}
                    height={followerHeight}
                    className='h-full w-full object-cover'
                    draggable={false}
                    unoptimized
                />
            </div>
        ) : null

    return (
        <>
            <div
                ref={containerRef}
                className='absolute inset-0'
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className='h-full w-full'
                    style={{
                        transform: `translate(${transform.x}px, ${transform.y}px)`,
                        transition:
                            transform.x === 0 && transform.y === 0
                                ? 'transform 0.3s ease-out'
                                : 'none',
                    }}
                >
                    <Image
                        {...imageProps}
                        className={className}
                        alt={imageProps.alt}
                    />
                </div>
            </div>
            {follower ? createPortal(follower, document.body) : null}
        </>
    )
}
