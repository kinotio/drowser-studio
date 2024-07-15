'use client'

import { useState, useEffect } from 'react'
import { Canvas, CanvasPosition } from 'reaflow'

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
    <div className='w-[80vw] h-full relative overflow-hidden border border-gray-200 rounded-md p-6'>
      <Canvas
        defaultPosition={CanvasPosition.LEFT}
        direction='RIGHT'
        zoomable
        pannable
        readonly
        nodes={nodes}
        edges={edges}
      />
    </div>
  )
}

export default Page
