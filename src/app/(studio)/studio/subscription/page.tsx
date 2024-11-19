'use client'

import { useState, useEffect } from 'react'
import { Check, Zap, CreditCard } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@components/ui/skeleton'
import { SubsButton } from '@/components/subs-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination'

import { pocketbase } from '@/lib/pocketbase'
import { Plan, Subscription, Payment } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'

const Page = () => {
  const { userId } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()
  const [sub, setSub] = useState<Subscription>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [payments, setPayments] = useState<Payment[]>([])

  const itemsPerPage = 6

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    pocketbase
      .collection('plans')
      .getList(1, 3)
      .then((data) => setPlans(data.items as Plan[]))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    pocketbase
      .collection('subscriptions')
      .getFirstListItem<Subscription>('', {
        filter: `user_id = "${userId}"`
      })
      .then(async (data) => {
        setSub(data as Subscription)
        pocketbase
          .collection('plans')
          .getFirstListItem('', { filter: `id = "${data.plan_id}"` })
          .then((data) => setCurrentPlan(data as Plan))
      })
      .finally(() => setIsLoading(false))
  }, [userId])

  useEffect(() => {
    pocketbase
      .collection('payments')
      .getList(currentPage, itemsPerPage, {
        filter: `user_id = "${userId}"`,
        sort: '-created'
      })
      .then((data) => {
        setPayments(data.items as Payment[])
        setTotal(data.totalItems)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [userId, currentPage])

  return (
    <div className='mx-auto px-4 pt-4 pb-8 flex flex-col gap-6 mb-[100px]'>
      <div className='flex justify-between items-center w-full'>
        <Badge variant='secondary' className='flex gap-2'>
          <Zap size={20} />
          <span className='text-xl font-bold'>Subscription</span>
        </Badge>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan?.type} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {sub?.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {sub?.customer_email}
          </p>
        </CardContent>
      </Card>

      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Available Plans</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {isLoading ? (
            <>
              <Skeleton className='w-full h-[425px] rounded-md' />
              <Skeleton className='w-full h-[425px] rounded-md' />
            </>
          ) : (
            <>
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col ${
                    currentPlan?.type === plan.type ? 'border-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <CardTitle className='flex justify-between items-center'>
                      {plan.name}
                      {currentPlan?.type === plan.type && (
                        <Badge variant='default'>Current Plan</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <span className='text-3xl font-bold'>${plan.price.toFixed(2)}</span> / month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <ul className='space-y-2'>
                      {plan.metadata.features.map((feature, index) => (
                        <li key={index} className='flex items-center'>
                          <Check className='mr-2 h-4 w-4 text-green-500' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className='mt-auto'>
                    <SubsButton
                      planId={plan.id}
                      priceId={plan.price_id}
                      disabled={currentPlan?.type === plan.type}
                    >
                      {currentPlan?.type === plan.type
                        ? 'Current Plan'
                        : currentPlan?.type === 'pro'
                        ? ' Downgrade'
                        : 'Upgrade'}
                      {currentPlan?.type !== plan.type && <Zap className='ml-2 h-4 w-4' />}
                    </SubsButton>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Payment History</h2>
        <Card>
          <CardContent>
            <Table className='mb-6'>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{readableTimestamp(payment.date)}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className='flex items-center'>
                        <CreditCard className='mr-2 h-4 w-4 text-green-500' />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <PayementsTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const PayementsTablePagination = ({
  currentPage,
  totalPages,
  handlePageChange
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage !== 1 ? (
            <PaginationPrevious href='#' onClick={() => handlePageChange(currentPage - 1)} />
          ) : null}
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {currentPage !== totalPages ? (
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          ) : null}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Page
