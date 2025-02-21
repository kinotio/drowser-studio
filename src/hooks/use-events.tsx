import { useState, useEffect } from 'react'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

export enum EventTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ACCOUNT_CREATED = 'ACCOUNT_CREATED',
  REPORT_IMPORTED = 'REPORT_IMPORTED',
  REPORT_DELETED = 'REPORT_DELETED'
}

type Event = {
  type: EventTypes
  payload: unknown
}

type PredicateFn = (event: Event) => boolean

const eventBus = new Subject<Event>()

export const useEvents = (predicateFn: PredicateFn) => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const subscription = eventBus.pipe(filter(predicateFn)).subscribe((event) => {
      setEvents((prevEvents) => [...prevEvents, event])
    })
    return () => subscription.unsubscribe()
  }, [predicateFn])

  const publish = (event: Event) => eventBus.next(event)

  return { events, publish }
}
