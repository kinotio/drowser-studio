import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table'

import { TContentSubCase } from '@/types'

export default function TableComponent({ content }: { content: any }) {
  return (
    <div className='border rounded-lg w-full'>
      <div className='relative w-full overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Exceptation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(content?.cases) &&
              content?.cases.map((c: TContentSubCase) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.actual}</TableCell>
                  <TableCell>{c.exceptation}</TableCell>
                  <TableCell className={c.status === 'ok' ? 'text-green-500' : 'text-red-500'}>
                    {c.status.toUpperCase()}
                  </TableCell>
                  <TableCell>{c.timestamp}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
