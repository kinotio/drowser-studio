'use client'

import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { Canvas, CanvasPosition, CanvasRef, Node as ReaflowNode } from 'reaflow'
import {
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  FolderRootIcon,
  GlobeIcon,
  TimerIcon,
  CalendarIcon,
  ClipboardIcon,
  CircleCheckIcon,
  CircleXIcon,
  BoxesIcon,
  XIcon
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { TContentCase, TContentSubCase } from '@/lib/definitions'
import { humanizeDuration, readableTimestamp } from '@/lib/utils'
import { CASE_STATUS, PATH } from '@/lib/constants'

import { getReport } from '@/server/actions'
import type { ReportWithTimestamps } from '@/server/types/extended'
import type { ReportModiefied } from '@/server/databases/types'

type Node = {
  id: string
  text?: string
  nodes?: Node[]
  width?: number
  height?: number
  data?: TContentCase | TContentSubCase | Record<string, unknown>
}

type Edge = {
  id: string
  from: string
  to: string
}

const Page = () => {
  const router = useRouter()
  const query = useSearchParams()
  const { reportSlug } = useParams()
  const { userId } = useAuth()

  const ref = useRef<CanvasRef | null>(null)
  const [zoom, setZoom] = useState<number>(0.7)

  const [report, setReport] = useState<ReportModiefied>()

  const root: Node = {
    id: 'root',
    text: 'Root',
    data: {
      name: 'Root'
    },
    nodes: report?.metadata?.drowser?.cases.map((group) => ({
      id: group.id,
      text: group.id,
      data: { ...group },
      nodes: group.cases.map((testCase) => ({
        id: testCase.id,
        text: testCase.id,
        data: { ...testCase }
      }))
    }))
  }

  const flattenNodes = (node: Node, flatNodes: Node[] = []): Node[] => {
    flatNodes.push({ id: node.id, width: 500, height: 125, data: node.data })
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

  const clearSeachParams = () => router.replace('/studio/reports/visualize')

  const nodes: Node[] = flattenNodes(root || [])
  const edges: Edge[] = generateEdges(root || [])
  const nodeIdQuery = query.get('node')

  useEffect(() => {
    getReport({ userId: userId as string, reportSlug: reportSlug as string })
      .then((response) => {
        if (response.success && response.data) {
          // Get report from the response data
          const report = response.data as ReportWithTimestamps & ReportModiefied
          setReport(report)
        } else {
          console.error('Error fetching report for visualization:', response.error)
        }
      })
      .catch((err) => console.log(err))
  }, [userId, reportSlug])

  return (
    <div className='container mx-auto min-h-[500px] h-[85vh] w-full max-w-[1500px] relative overflow-hidden'>
      <Canvas
        arrow={null}
        panType='drag'
        maxZoom={10}
        minZoom={-0.9}
        maxWidth={10000}
        maxHeight={10000}
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
        node={renderNode({ router, nodeIdQuery, reportSlug: reportSlug as string })}
      />
      <ZoomControls passedRef={ref} nodeIdQuery={nodeIdQuery} clearSeachParams={clearSeachParams} />
    </div>
  )
}

const renderNode = ({
  router,
  nodeIdQuery,
  reportSlug
}: {
  router: AppRouterInstance
  nodeIdQuery: string | null
  reportSlug: string
}) => {
  return (
    <ReaflowNode>
      {(event) => {
        const isNodeQueryId = event.node.data.id === nodeIdQuery

        return (
          <foreignObject width={event.width} height={event.height} x={0} y={0}>
            {event.node.data && Object.keys(event.node?.data).length !== 0 ? (
              <Card
                className={`${
                  !event.node.data.name && event.node.data.name !== 'Root' ? 'cursor-pointer' : ''
                } ${
                  isNodeQueryId ? 'border-primary border-2 bg-primary' : 'bg-white'
                } h-full w-full flex items-center justify-center flex-col  rounded-none`}
                onClick={() => {
                  if (!event.node.data.name && event.node.data.name !== 'Root') {
                    router.push(`${PATH.STUDIO_REPORTS}/${reportSlug}/cases/${event.node.id}`)
                  }
                }}
              >
                <CardContent className='w-full h-full py-6'>
                  <div className='flex  items-center justify-center gap-4'>
                    <div className='flex gap-2 items-center'>
                      <div className='bg-gray-200 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center'>
                        {event.node.data.name ? (
                          <div>
                            {event.node.data.name === 'Root' ? (
                              <FolderRootIcon
                                className={`${
                                  isNodeQueryId ? 'text-primary' : 'text-gray-500'
                                } h-4 w-4 dark:text-white`}
                              />
                            ) : (
                              <ClipboardIcon
                                className={`${
                                  isNodeQueryId ? 'text-primary' : 'text-gray-500'
                                } h-4 w-4 dark:text-white`}
                              />
                            )}
                          </div>
                        ) : (
                          <BoxesIcon className='h-4 w-4 text-gray-500 dark:text-white' />
                        )}
                      </div>
                      <div>
                        <h4
                          className={`${isNodeQueryId ? 'text-white' : 'text-black'} font-medium`}
                        >
                          {!event.node.data.name ? 'Group' : event.node.data.name}
                        </h4>
                      </div>
                    </div>

                    {event.node.data.status ? (
                      <div className='flex gap-4'>
                        <p
                          className={`capitalize text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center ${
                            event.node.data.status === CASE_STATUS.passed
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {event.node.data.status === CASE_STATUS.passed ? (
                            <CircleCheckIcon size='16' />
                          ) : (
                            <CircleXIcon size='16' />
                          )}
                          {event.node.data.status}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className='text-sm text-gray-500 dark:text-gray-400 justify-center w-full'>
                    {event.node.data.browser ? (
                      <div className='flex gap-4'>
                        <Badge variant='secondary'>
                          <TimerIcon size='16' className='mr-1' />
                          {humanizeDuration(
                            event.node.data.duration ?? event.node.data.avg_duration
                          )}
                        </Badge>
                        <Badge
                          variant={`${isNodeQueryId ? 'secondary' : 'default'}`}
                          className='dark:bg-primary'
                        >
                          <CalendarIcon size='16' className='mr-1' />
                          {readableTimestamp(event.node.data.timestamp ?? event.node.data.time)}
                        </Badge>
                        <Badge
                          variant={`${isNodeQueryId ? 'secondary' : 'outline'}`}
                          className='text-neutral-900'
                        >
                          <GlobeIcon size='16' className='mr-1' />
                          {event.node.data.browser}
                        </Badge>
                      </div>
                    ) : (
                      <Badge>This is the main root of the graph.</Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ) : null}
          </foreignObject>
        )
      }}
    </ReaflowNode>
  )
}

const ZoomControls = ({
  passedRef,
  nodeIdQuery,
  clearSeachParams
}: {
  passedRef: MutableRefObject<CanvasRef | null>
  nodeIdQuery: string | null
  clearSeachParams: () => void
}) => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-card p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='grid gap-2 p-5 right-0 bottom-0 absolute z-10'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='bg-primary dark:bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
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
                  className='bg-primary dark:bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
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
                  className='bg-primary dark:bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
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
                  className='bg-primary dark:bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                  onClick={() => passedRef.current?.fitNodes?.(nodeIdQuery ?? 'root')}
                >
                  {nodeIdQuery ? (
                    <ClipboardIcon className='h-4 w-4' />
                  ) : (
                    <FolderRootIcon className='h-4 w-4' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{nodeIdQuery ? `View current node` : 'Fit to Root'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {nodeIdQuery ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary'
                    onClick={clearSeachParams}
                  >
                    <XIcon className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear seach query</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Page
