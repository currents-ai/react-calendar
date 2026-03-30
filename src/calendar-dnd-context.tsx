import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { addMinutes, differenceInMinutes } from "date-fns"

import { EventItem } from "./event-item"
import { CalendarEvent } from "./types"

type CalendarDndContextType = {
  activeEvent: CalendarEvent | null
  activeId: string | number | null
  currentTime: Date | null
}

const CalendarDndContext = createContext<CalendarDndContextType>({
  activeEvent: null,
  activeId: null,
  currentTime: null,
})

export const useCalendarDnd = () => useContext(CalendarDndContext)

interface CalendarDndProviderProps {
  children: ReactNode
  onEventUpdate: (event: CalendarEvent) => void
}

export function CalendarDndProvider({
  children,
  onEventUpdate,
}: CalendarDndProviderProps) {
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null)
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeView, setActiveView] = useState<"month" | "week" | "day" | null>(
    null
  )
  const [currentTime, setCurrentTime] = useState<Date | null>(null)


  const handleDragStart = (event: any) => {
    const { operation } = event
    const source = operation.source

    if (!source?.data) return

    const { event: calendarEvent, view } = source.data as {
      event: CalendarEvent
      view: "month" | "week" | "day"
    }

    setActiveEvent(calendarEvent)
    setActiveId(source.id)
    setActiveView(view)
    setCurrentTime(new Date(calendarEvent.start))
  }

  const snapToQuarterHour = (time: number) => {
    const hours = Math.floor(time)
    const fractionalHour = time - hours

    let minutes = 0
    if (fractionalHour < 0.125) minutes = 0
    else if (fractionalHour < 0.375) minutes = 15
    else if (fractionalHour < 0.625) minutes = 30
    else minutes = 45

    return { hours, minutes }
  }

  const handleDragOver = (event: any) => {
    const { operation } = event
    const target = operation.target

    if (!target?.data || !activeEvent) return

    const { date, time } = target.data as { date: Date; time?: number }

    if (time !== undefined) {
      const { hours, minutes } = snapToQuarterHour(time)
      const newTime = new Date(date)
      newTime.setHours(hours, minutes, 0, 0)

      if (
        !currentTime ||
        newTime.getTime() !== currentTime.getTime()
      ) {
        setCurrentTime(newTime)
      }
    } else {
      // Month view: update date, preserve time
      const newTime = new Date(date)
      if (currentTime) {
        newTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          0
        )
      }

      if (!currentTime || newTime.getTime() !== currentTime.getTime()) {
        setCurrentTime(newTime)
      }
    }
  }

  const resetState = () => {
    setActiveEvent(null)
    setActiveId(null)
    setActiveView(null)
    setCurrentTime(null)
  }

  const handleDragEnd = (event: any) => {
    const { operation } = event
    const source = operation.source
    const target = operation.target

    if (!target || !activeEvent || !currentTime) {
      resetState()
      return
    }

    try {
      if (!source?.data || !target?.data) {
        throw new Error("Missing data in drag event")
      }

      const activeData = source.data as { event?: CalendarEvent }
      const overData = target.data as { date?: Date; time?: number }

      if (!activeData.event || !overData.date) {
        throw new Error("Missing required event data")
      }

      const calendarEvent = activeData.event
      const date = overData.date
      const time = overData.time

      const newStart = new Date(date)

      if (time !== undefined) {
        const { hours, minutes } = snapToQuarterHour(time)
        newStart.setHours(hours, minutes, 0, 0)
      } else {
        newStart.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          0,
          0
        )
      }

      const originalStart = new Date(calendarEvent.start)
      const originalEnd = new Date(calendarEvent.end)
      const durationMinutes = differenceInMinutes(originalEnd, originalStart)
      const newEnd = addMinutes(newStart, durationMinutes)

      if (originalStart.getTime() !== newStart.getTime()) {
        onEventUpdate({
          ...calendarEvent,
          start: newStart,
          end: newEnd,
        })
      }
    } catch (error) {
      console.error("Error in drag end handler:", error)
    } finally {
      resetState()
    }
  }

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <CalendarDndContext.Provider
        value={{
          activeEvent,
          activeId,
          currentTime,
        }}
      >
        {children}

        <DragOverlay>
          {activeEvent ? (
            <div
              className="pointer-events-none w-48 opacity-80 shadow-lg"
              style={{ maxWidth: activeView === "month" ? "12rem" : "10rem" }}
            >
              <EventItem
                event={activeEvent}
                view={activeView || "month"}
                showTime={activeView !== "month"}
                currentTime={currentTime || undefined}
              />
            </div>
          ) : null}
        </DragOverlay>
      </CalendarDndContext.Provider>
    </DragDropProvider>
  )
}
