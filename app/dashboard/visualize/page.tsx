'use client'

import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { Canvas, CanvasPosition, CanvasRef } from 'reaflow'
import { ZoomInIcon, ZoomOutIcon, MaximizeIcon, FolderRootIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'

import { TDrowserReport } from '@/lib/definitions'

type Node = {
  id: string
  text: string
  nodes?: Node[]
}

type Edge = {
  id: string
  from: string
  to: string
}

const Page = () => {
  const report = useStore(useReportStore, (state) => state.content) as string

  const [content, setContent] = useState<TDrowserReport>()
  const [zoom, setZoom] = useState<number>(0.7)
  const ref = useRef<CanvasRef | null>(null)

  useEffect(() => {
    try {
      setContent(JSON.parse(report))
    } catch (error) {}
  }, [report])

  const mainNode: Node = {
    id: 'main',
    text: 'Main Node',
    nodes: content?.drowser.cases.map((group) => ({
      id: group.id,
      text: group.id,
      nodes: group.cases.map((testCase) => ({
        id: testCase.id,
        text: testCase.id
      }))
    }))
  }

  const flattenNodes = (node: Node, flatNodes: Node[] = []): Node[] => {
    flatNodes.push({ id: node.id, text: node.text })
    if (node.nodes) {
      node.nodes.forEach((child) => flattenNodes(child, flatNodes))
    }
    return flatNodes
  }

  const generateEdges = (node: Node, edges: Edge[] = []): Edge[] => {
    if (node.nodes && node.nodes.length > 0) {
      node.nodes.forEach((child) => {
        edges.push({
          id: `${node.id}-${child.id}`,
          from: node.id,
          to: child.id
        })
        generateEdges(child, edges)
      })
    }
    return edges
  }

  const nodes: Node[] = flattenNodes(mainNode || [])
  const edges: Edge[] = generateEdges(mainNode || [])

  return (
    <div className='w-[80vw] h-full relative overflow-hidden'>
      <Canvas
        panType='drag'
        maxZoom={10}
        minZoom={-0.9}
        maxWidth={3000}
        maxHeight={1500}
        zoom={zoom}
        ref={ref}
        defaultPosition={CanvasPosition.LEFT}
        direction='RIGHT'
        zoomable
        pannable
        readonly
        nodes={nodes}
        edges={edges}
        className='p-0 m-0 border'
        onZoomChange={(z) => setZoom(z)}
      />

      <ZoomControls passedRef={ref} />
    </div>
  )
}

const ZoomControls = ({ passedRef }: { passedRef: MutableRefObject<CanvasRef | null> }) => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-card p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='grid grid-cols-4 gap-2 p-5 right-0 bottom-0 absolute z-10'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                  onClick={() => passedRef.current?.zoomIn?.()}
                >
                  <ZoomInIcon className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                  onClick={() => passedRef.current?.zoomOut?.()}
                >
                  <ZoomOutIcon className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                  onClick={() => passedRef.current?.fitCanvas?.(true)}
                >
                  <MaximizeIcon className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fit to Viewport</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                  onClick={() => passedRef.current?.fitNodes?.('main')}
                >
                  <FolderRootIcon className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fit to Root</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export default Page
