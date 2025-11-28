"use client"

import * as React from "react"
import { motion, AnimatePresence, type Transition } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as d3Shape from "d3-shape"

// Types
export type Point = [number, number] // Pixels [x, y]

export interface AnnotationBase {
  id: string
  label?: string
  description?: React.ReactNode
  color?: string
}

export interface RegionAnnotation extends AnnotationBase {
  type: "region"
  points: Point[]
}

export interface PathAnnotation extends AnnotationBase {
  type: "path"
  points: Point[]
  curve?: boolean
}

export interface PathWithPointsAnnotation extends AnnotationBase {
  type: "path-with-points"
  points: Point[] // Must have at least 2 points
  pathLabel?: string // Label for the path itself (midpoint)
  startLabel?: string
  endLabel?: string
  markers?: boolean
  curve?: boolean
}

export interface PointAnnotation extends AnnotationBase {
  type: "point"
  coordinates: Point
}

export type Annotation = RegionAnnotation | PathAnnotation | PointAnnotation | PathWithPointsAnnotation

// Component Props
interface AnnotationLayerProps {
  width: number
  height: number
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick?: () => void
}

const transition: Transition = { duration: 0.5, ease: "easeInOut" }

// Helper to ensure points are in [number, number] format
const getPoint = (point: Point): [number, number] => {
  return [point[0], point[1]]
}

const RegionLayer = ({
  annotation,
  width,
  height,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: { annotation: RegionAnnotation } & AnnotationLayerProps) => {
  const color = annotation.color || "currentColor"
  const pointsString = annotation.points
    .map(([x, y]) => `${x},${y}`)
    .join(" ")

  return (
    <AnnotationWrapper annotation={annotation}>
      <g>
        {/* Cross-hatch background for region */}
        <motion.polygon
          points={pointsString}
          fill="url(#dense_crosshatch)"
          opacity={isActive ? 0.45 : 0}
          className="transition-opacity duration-300"
          style={{ pointerEvents: "none" }}
        />
        
        <motion.polygon
          points={pointsString}
          fill={color}
          fillOpacity={isActive ? 0.4 : 0.2}
          stroke={isActive ? "black" : color}
          strokeWidth={isActive ? 2 : 2}
          strokeDasharray={isActive ? "2,3" : "none"}
          filter={isActive ? "url(#glow)" : "none"}
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0}}
          transition={transition}
        />
      </g>
    </AnnotationWrapper>
  )
}

const PathLayer = ({
  annotation,
  width,
  height,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: { annotation: PathAnnotation } & AnnotationLayerProps) => {
  const color = annotation.color || "currentColor"
  
  const pixelPoints = annotation.points.map(p => getPoint(p))
  
  const pathGenerator = d3Shape.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(annotation.curve ? d3Shape.curveCatmullRom : d3Shape.curveLinear)

  const pathData = pathGenerator(pixelPoints) || ""

  return (
    <AnnotationWrapper annotation={annotation}>
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 4 : 3}
        filter={isActive ? "url(#glow)" : "none"}
        vectorEffect="non-scaling-stroke"
        className="transition-all duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        exit={{ opacity: 0, pathLength: 0 }}
        transition={transition}
      />
    </AnnotationWrapper>
  )
}

const PathWithPointsLayer = ({
  annotation,
  width,
  height,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: { annotation: PathWithPointsAnnotation } & AnnotationLayerProps) => {
  const color = annotation.color || "currentColor"
  
  const pixelPoints = annotation.points.map(p => getPoint(p))
  
  // Use D3 to generate path
  const pathGenerator = d3Shape.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(annotation.curve ? d3Shape.curveCatmullRom.alpha(0.5) : d3Shape.curveLinear)
    
  const pathData = pathGenerator(pixelPoints) || ""
  
  // For accurate placement on the curve, we'd need to sample the path length, which is hard in React render.
  // Simple midpoint approximation is usually "good enough" for labels unless curve is extreme.
  // Calculate midpoint for path label
  const totalPoints = annotation.points.length
  const midIndex = Math.floor((totalPoints - 1) / 2)
  const p1 = annotation.points[midIndex]
  const p2 = annotation.points[midIndex + 1]
  
  const midX = p1 && p2 ? (p1[0] + p2[0]) / 2 : 0
  const midY = p1 && p2 ? (p1[1] + p2[1]) / 2 : 0

  // Create point markers for each vertex in the path
  const pointMarkers = annotation.points.map((point, index) => {
    const cx = point[0]
    const cy = point[1]
    return { cx, cy, id: `${annotation.id}-point-${index}` }
  })

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
    >
      <AnnotationWrapper annotation={annotation}>
         <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={isActive ? 4 : 3}
          filter={isActive ? "url(#glow)" : "none"}
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, pathLength: 0 },
            visible: { 
              opacity: 1, 
              pathLength: 1,
              transition: { duration: 1.5, ease: "easeInOut" }
            }
          }}
        />
      </AnnotationWrapper>
      
      {/* Path Label (Midpoint) */}
      {annotation.pathLabel && (isActive || annotation.markers) && (
        <foreignObject x={midX - 50} y={midY - 15} width={100} height={30} className="overflow-visible pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center items-center h-full"
          >
            <span className="bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md border shadow-sm whitespace-nowrap">
              {annotation.pathLabel}
            </span>
          </motion.div>
        </foreignObject>
      )}

      {pointMarkers.map((marker, idx) => {
        const isStart = idx === 0
        const isEnd = idx === pointMarkers.length - 1
        const label = isStart ? annotation.startLabel : isEnd ? annotation.endLabel : undefined

        return (
          <motion.g key={marker.id} 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { delay: idx * 0.5, duration: 0.3 } 
              }
            }}
          >
             <circle
              cx={marker.cx}
              cy={marker.cy}
              r={isActive ? 8 : 6}
              fill={color}
              className="origin-center transition-all duration-300"
              stroke="white"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
             <motion.circle
              cx={marker.cx}
              cy={marker.cy}
              r={isActive ? 8 : 6}
              fill="none"
              stroke={color}
              strokeWidth={2}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Start/End Labels */}
            {label && (isActive || annotation.markers) && (
              <foreignObject x={marker.cx - 50} y={marker.cy + 10} width={100} height={30} className="overflow-visible pointer-events-none">
                 <motion.div 
                   initial={{ opacity: 0, y: -5 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.5 + 0.3, duration: 0.3 }}
                   className="flex justify-center items-center h-full"
                 >
                  <span className="bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md border shadow-sm whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              </foreignObject>
            )}
          </motion.g>
        )
      })}
    </g>
  )
}

const PointLayer = ({
  annotation,
  width,
  height,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: { annotation: PointAnnotation } & AnnotationLayerProps) => {
  const color = annotation.color || "currentColor"
  const cx = annotation.coordinates[0]
  const cy = annotation.coordinates[1]

  return (
    <AnnotationWrapper annotation={annotation}>
      <motion.g
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={transition}
      >
        <circle
          cx={cx}
          cy={cy}
          r={isActive ? 8 : 6}
          fill={color}
          className="origin-center transition-all duration-300"
          stroke="white"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          filter={isActive ? "url(#glow)" : "none"}
        />
        {/* Pulse effect */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={isActive ? 8 : 6}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </AnnotationWrapper>
  )
}

const diagramVariants = cva(
  "relative w-full overflow-hidden rounded-lg @container",
  {
    variants: {
      variant: {
        default: "bg-muted",
        minimal: "bg-transparent",
        bordered: "border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AnnotatedDiagramProps extends VariantProps<typeof diagramVariants> {
  src: string
  alt: string
  width: number
  height: number
  annotations: Annotation[]
  className?: string
  onAnnotationClick?: (annotation: Annotation) => void
  containerClassName?: string
}

export function AnnotatedDiagram({
  src,
  alt,
  width,
  height,
  annotations,
  className,
  onAnnotationClick,
  containerClassName,
}: AnnotatedDiagramProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const renderAnnotation = (annotation: Annotation) => {
    const commonProps = {
      width,
      height,
      isActive: activeId === annotation.id,
      onMouseEnter: () => setActiveId(annotation.id),
      onMouseLeave: () => setActiveId(null),
      onClick: () => onAnnotationClick?.(annotation),
    }

    switch (annotation.type) {
      case "region":
        return <RegionLayer key={annotation.id} annotation={annotation} {...commonProps} />
      case "path":
        return <PathLayer key={annotation.id} annotation={annotation} {...commonProps} />
      case "path-with-points":
        return <PathWithPointsLayer key={annotation.id} annotation={annotation} {...commonProps} />
      case "point":
        return <PointLayer key={annotation.id} annotation={annotation} {...commonProps} />
    }
  }

  return (
    <div
    id="diagram-container"
    className="@container:diagram flex w-full h-full items-center justify-center bg-transparent"
  >
    <div
      id="diagram"
      className={cn(
        "relative isolate flex flex-col items-center justify-center overflow-clip rounded-2xl",
      )}
      style={{ width: `min(96cqw, calc(96cqh * ${width} / ${height}))`, aspectRatio: `${width} / ${height}` }}
    >
      {/* SVG Overlay */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        width={'100%'}
        height={'100%'}
        className={cn(
          // "absolute inset-0 h-full w-full", // Ensure pointer events are active on background rect
          className
        )}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <pattern
            id="dense_crosshatch"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <path
              d="M 0,8 l 8,-8 M -2,2 l 4,-4 M 6,10 l 4,-4"
              strokeWidth="1"
              shapeRendering="auto"
              stroke="#343434"
              strokeLinecap="square"
              opacity="0.5"
            ></path>
          </pattern>
          {/* Background image pattern */}
          <pattern
            id="bg_img"
            patternUnits="userSpaceOnUse"
            width={width}
            height={height}
          >
            <image
              href={src}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice" 
            />
          </pattern>
        </defs>

        {/* Background Rect */}
        <rect
          width={width}
          height={height}
          fill="url(#bg_img)"
          onClick={() => setActiveId(null)} // Clicking background clears selection
        />

        <AnimatePresence>
          {annotations.map(renderAnnotation)}
        </AnimatePresence>
      </svg>
    </div>
    </div>
  )
}

function AnnotationWrapper({
  children,
  annotation,
}: {
  children: React.ReactNode
  annotation: Annotation
}) {
  if (!annotation.label && !annotation.description) {
    return <>{children}</>
  }

  // Using Popover instead of Tooltip for better persistence and interaction
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 z-50">
        <div className="flex flex-col gap-1">
          {annotation.label && (
            <p className="font-semibold text-sm">{annotation.label}</p>
          )}
          {annotation.description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {annotation.description}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
