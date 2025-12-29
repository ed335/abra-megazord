"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: number
  title: string
  description: string
  date?: string
  icon?: React.ReactNode
}

interface RadialOrbitalTimelineProps {
  items: TimelineItem[]
  title?: string
  className?: string
}

export function RadialOrbitalTimeline({
  items,
  title = "Timeline",
  className,
}: RadialOrbitalTimelineProps) {
  const radius = 200
  const center = { x: 250, y: 250 }

  return (
    <div className={cn("relative w-full max-w-xl mx-auto aspect-square", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <h3 className="text-2xl font-bold text-[#1d1d1f]">{title}</h3>
        </div>
      </div>

      {/* Orbital rings */}
      <svg className="absolute inset-0 w-full h-full">
        <circle
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle
          cx={center.x}
          cy={center.y}
          r={radius - 40}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Orbital items */}
      {items.map((item, index) => {
        const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2
        const x = center.x + radius * Math.cos(angle)
        const y = center.y + radius * Math.sin(angle)

        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: x - 60,
              top: y - 40,
              width: 120,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="bg-white rounded-lg border border-[#e5e5e5] p-3 shadow-sm hover:shadow-md hover:border-[#6B7C59]/40 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-1">
                {item.icon && (
                  <div className="p-1.5 bg-[#6B7C59]/10 rounded-full text-[#6B7C59] group-hover:bg-[#6B7C59] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                )}
                <span className="text-xs text-[#86868b]">{item.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#1d1d1f] line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#86868b] line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>

            {/* Connector line */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <circle
                cx="20"
                cy="20"
                r="4"
                className="fill-[#6B7C59]"
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}
