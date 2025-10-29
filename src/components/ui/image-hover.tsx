'use client'

import { useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageHoverProps
    extends Omit<ImageProps, 'onMouseMove' | 'onMouseLeave'> {
    movementIntensity?: number
}

export function ImageHover({
    movementIntensity = 15,
    className = '',
    ...imageProps
}: ImageHoverProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) / rect.width
        const deltaY = (e.clientY - centerY) / rect.height

        setTransform({
            x: -deltaX * movementIntensity,
            y: -deltaY * movementIntensity,
        })
    }

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 })
    }

    return (
        <div
            ref={containerRef}
            className='absolute inset-0'
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
    )
}
