"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import * as d3Shape from "d3-shape"
import { 
  MousePointer2, 
  Circle, 
  Spline, 
  Hexagon, 
  Wand2, 
  Trash2, 
  Check, 
  X,
  Download,
  Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

import { 
  AnnotatedDiagram, 
  type Annotation, 
  type Point, 
  type RegionAnnotation, 
  type PathAnnotation, 
  type PointAnnotation,
  type PathWithPointsAnnotation
} from "./annotated-diagram"

// Editor Types
type Tool = "select" | "region" | "path" | "path-with-points" | "point" | "magic-wand"

interface AnnotatedDiagramEditorProps {
  src: string
  alt?: string
  width: number
  height: number
  initialAnnotations?: Annotation[]
  onSave?: (annotations: Annotation[]) => void
}

export function AnnotatedDiagramEditor({
  src,
  alt = "Diagram",
  width,
  height,
  initialAnnotations = [],
  onSave
}: AnnotatedDiagramEditorProps) {
  const [annotations, setAnnotations] = React.useState<Annotation[]>(initialAnnotations)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [tool, setTool] = React.useState<Tool>("select")
  
  // Drawing state
  const [currentPoints, setCurrentPoints] = React.useState<Point[]>([])
  const [mousePos, setMousePos] = React.useState<Point | null>(null)

  // AI Assist (Mock for now, ready for SAM integration)
  const handleAutoSegment = async (clickPoint: Point) => {
    toast.info("Magic Wand / SAM Integration", {
      description: "This is where the Segment Anything Model would trigger. Currently using a mock shape."
    })
    
    // Mock: Create a small octagon around the point
    const radius = 50
    const points: Point[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      points.push([
        clickPoint[0] + Math.cos(angle) * radius,
        clickPoint[1] + Math.sin(angle) * radius
      ])
    }
    
    const newAnnotation: RegionAnnotation = {
      id: crypto.randomUUID(),
      type: "region",
      points,
      label: "Auto Region",
      color: "#3b82f6"
    }
    
    setAnnotations(prev => [...prev, newAnnotation])
    setSelectedId(newAnnotation.id)
    setTool("select")
  }

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (width / rect.width)
    const y = (e.clientY - rect.top) * (height / rect.height)
    const point: Point = [x, y]

    if (tool === "magic-wand") {
      handleAutoSegment(point)
      return
    }

    if (tool === "point") {
      const newAnnotation: PointAnnotation = {
        id: crypto.randomUUID(),
        type: "point",
        coordinates: point,
        label: "New Point",
        color: "#ef4444"
      }
      setAnnotations(prev => [...prev, newAnnotation])
      setSelectedId(newAnnotation.id)
      setTool("select")
      return
    }

    if (tool === "region" || tool === "path" || tool === "path-with-points") {
      setCurrentPoints(prev => [...prev, point])
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (width / rect.width)
    const y = (e.clientY - rect.top) * (height / rect.height)
    setMousePos([x, y])
  }

  const finishDrawing = () => {
    if (currentPoints.length < 2) {
      setCurrentPoints([])
      return
    }

    const id = crypto.randomUUID()
    let newAnnotation: Annotation

    if (tool === "region") {
      newAnnotation = {
        id,
        type: "region",
        points: currentPoints,
        label: "New Region",
        color: "#3b82f6"
      } as RegionAnnotation
    } else if (tool === "path") {
      newAnnotation = {
        id,
        type: "path",
        points: currentPoints,
        label: "New Path",
        color: "#22c55e",
        curve: true
      } as PathAnnotation
    } else { // path-with-points
      newAnnotation = {
        id,
        type: "path-with-points",
        points: currentPoints,
        pathLabel: "Path Label",
        color: "#8b5cf6",
        curve: true
      } as PathWithPointsAnnotation
    }

    setAnnotations(prev => [...prev, newAnnotation])
    setSelectedId(id)
    setCurrentPoints([])
    setTool("select")
  }

  const cancelDrawing = () => {
    setCurrentPoints([])
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentPoints.length > 0) {
        finishDrawing()
      }
      if (e.key === "Escape") {
        cancelDrawing()
        setTool("select")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPoints, tool])

  const selectedAnnotation = annotations.find(a => a.id === selectedId)

  const updateAnnotation = (id: string, updates: Partial<Annotation>) => {
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, ...updates } as Annotation : a))
  }

  const deleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id))
    setSelectedId(null)
  }

  // Helper to copy JSON
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(annotations, null, 2))
    toast.success("Copied JSON to clipboard")
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <ToolButton 
            active={tool === "select"} 
            onClick={() => setTool("select")} 
            icon={<MousePointer2 className="h-4 w-4" />} 
            label="Select" 
          />
          <div className="h-4 w-px bg-border mx-2" />
          <ToolButton 
            active={tool === "region"} 
            onClick={() => setTool("region")} 
            icon={<Hexagon className="h-4 w-4" />} 
            label="Region" 
          />
          <ToolButton 
            active={tool === "path"} 
            onClick={() => setTool("path")} 
            icon={<Spline className="h-4 w-4" />} 
            label="Path" 
          />
          <ToolButton 
            active={tool === "path-with-points"} 
            onClick={() => setTool("path-with-points")} 
            icon={<Spline className="h-4 w-4 text-purple-500" />} 
            label="Path+Pts" 
          />
          <ToolButton 
            active={tool === "point"} 
            onClick={() => setTool("point")} 
            icon={<Circle className="h-4 w-4" />} 
            label="Point" 
          />
          <div className="h-4 w-px bg-border mx-2" />
          <ToolButton 
            active={tool === "magic-wand"} 
            onClick={() => setTool("magic-wand")} 
            icon={<Wand2 className="h-4 w-4 text-indigo-500" />} 
            label="Magic Wand (SAM)" 
          />
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="h-4 w-4" />
                View JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Annotation Data</DialogTitle>
              </DialogHeader>
              <div className="relative">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <ScrollArea className="h-[60vh] rounded-md border p-4 bg-muted font-mono text-xs">
                  <pre>{JSON.stringify(annotations, null, 2)}</pre>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Canvas Area */}
        <div className="flex-1 overflow-auto bg-muted/50 p-8 flex items-center justify-center relative">
          
          <div className="relative shadow-xl rounded-lg overflow-hidden bg-white ring-1 ring-border">
            {/* Base Image & Annotations */}
            <AnnotatedDiagram
              src={src}
              alt={alt}
              width={width}
              height={height}
              annotations={annotations}
              onAnnotationClick={(a) => {
                if (tool === "select") setSelectedId(a.id)
              }}
              // Pass a minimal variant so we don't get double borders/bg
              variant="minimal"
            />

            {/* Interaction Overlay */}
            <svg
              className={cn(
                "absolute inset-0 w-full h-full",
                tool !== "select" && "cursor-crosshair",
                tool === "magic-wand" && "cursor-wand" // You might need custom cursor class
              )}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
              onClick={handleSvgClick}
              onMouseMove={handleMouseMove}
            >
              {/* Draft Drawing */}
              {currentPoints.length > 0 && (
                <>
                  {/* Lines connecting points */}
                  <polyline
                    points={currentPoints.map(p => p.join(",")).join(" ")}
                    fill="none"
                    stroke={
                      tool === "region" ? "#3b82f6" : 
                      tool === "path" ? "#22c55e" : "#8b5cf6"
                    }
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Line to mouse cursor */}
                  {mousePos && (
                    <line
                      x1={currentPoints[currentPoints.length - 1][0]}
                      y1={currentPoints[currentPoints.length - 1][1]}
                      x2={mousePos[0]}
                      y2={mousePos[1]}
                      stroke="black"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    />
                  )}
                  {/* Points */}
                  {currentPoints.map((p, i) => (
                    <circle
                      key={i}
                      cx={p[0]}
                      cy={p[1]}
                      r="3"
                      fill="white"
                      stroke="black"
                    />
                  ))}
                </>
              )}
            </svg>

            {/* Floating Finish/Cancel Controls for Drawing */}
            {currentPoints.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <span className="text-xs font-medium">Drawing... ({currentPoints.length} pts)</span>
                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-green-100 hover:text-green-600" onClick={finishDrawing}>
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-600" onClick={cancelDrawing}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Properties Sidebar */}
        <div className="w-80 border-l bg-background flex flex-col">
          <div className="p-4 border-b font-medium bg-muted/30">
            Properties
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {selectedAnnotation ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input 
                        value={selectedAnnotation.label || ""} 
                        onChange={(e) => updateAnnotation(selectedAnnotation.id, { label: e.target.value })}
                        placeholder="e.g. Frontal Lobe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={selectedAnnotation.description as string || ""} 
                        onChange={(e) => updateAnnotation(selectedAnnotation.id, { description: e.target.value })}
                        placeholder="Optional description..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Color</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="color" 
                            value={selectedAnnotation.color || "#000000"} 
                            className="w-8 h-8 p-0 border-0"
                            onChange={(e) => updateAnnotation(selectedAnnotation.id, { color: e.target.value })}
                          />
                          <span className="text-xs text-muted-foreground font-mono">{selectedAnnotation.color}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Type</Label>
                         <div className="text-sm font-medium capitalize py-2 px-3 bg-muted rounded-md">
                          {selectedAnnotation.type.replace(/-/g, " ")}
                         </div>
                      </div>
                    </div>

                    {/* Type specific fields */}
                    {(selectedAnnotation.type === "path" || selectedAnnotation.type === "path-with-points") && (
                      <div className="flex items-center justify-between">
                        <Label>Curved Line</Label>
                        <Switch 
                          checked={selectedAnnotation.curve} 
                          onCheckedChange={(c: boolean) => updateAnnotation(selectedAnnotation.id, { curve: c })} 
                        />
                      </div>
                    )}
                    
                    {selectedAnnotation.type === "path-with-points" && (
                       <div className="space-y-3 pt-2 border-t">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Labels</Label>
                        <Input 
                          placeholder="Start Label" 
                          value={selectedAnnotation.startLabel || ""}
                          onChange={(e) => updateAnnotation(selectedAnnotation.id, { startLabel: e.target.value })}
                        />
                        <Input 
                          placeholder="Path Label (Middle)" 
                          value={selectedAnnotation.pathLabel || ""}
                          onChange={(e) => updateAnnotation(selectedAnnotation.id, { pathLabel: e.target.value })}
                        />
                        <Input 
                          placeholder="End Label" 
                          value={selectedAnnotation.endLabel || ""}
                          onChange={(e) => updateAnnotation(selectedAnnotation.id, { endLabel: e.target.value })}
                        />
                       </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start" 
                      onClick={() => deleteAnnotation(selectedAnnotation.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Annotation
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-center">
                  <MousePointer2 className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">Select an annotation<br/>or start drawing</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function ToolButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode, 
  label: string 
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      className={cn("gap-2", active && "bg-secondary shadow-sm")}
      title={label}
    >
      {icon}
      <span className="sr-only sm:not-sr-only sm:inline-block text-xs">{label}</span>
    </Button>
  )
}

