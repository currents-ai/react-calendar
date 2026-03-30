import { useMemo } from "react"
import { differenceInMinutes, format, getMinutes, isPast } from "date-fns"

import { cn } from "./lib/utils"
import { CalendarEvent } from "./types"
import {
  getBorderRadiusClasses,
  getEventColorClasses,
  getTagColorClasses,
} from "./utils"

const formatTimeWithOptionalMinutes = (date: Date) => {
  return format(date, getMinutes(date) === 0 ? "ha" : "h:mma").toLowerCase()
}

function EventTag({ label, color,className }: { label: string; color?: string ,className?:string}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded px-0.5 py-px font-medium leading-tight text-[10px] mt-0.5",
        getTagColorClasses(color),
        className
      )}
    >
      {label}
    </span>
  )
}

interface EventWrapperProps {
  event: CalendarEvent
  isFirstDay?: boolean
  isLastDay?: boolean
  isDragging?: boolean
  onClick?: (e: React.MouseEvent) => void
  className?: string
  children: React.ReactNode
  currentTime?: Date
}

function EventWrapper({
  event,
  isFirstDay = true,
  isLastDay = true,
  isDragging,
  onClick,
  className,
  children,
  currentTime,
}: EventWrapperProps) {
  const displayEnd = currentTime
    ? new Date(
        new Date(currentTime).getTime() +
          (new Date(event.end).getTime() - new Date(event.start).getTime())
      )
    : new Date(event.end)

  const isEventInPast = isPast(displayEnd)

  return (
    <button
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 overflow-wrap flex h-full w-full px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] [&[data-dragging]]:cursor-grabbing [&[data-dragging]]:shadow-lg sm:px-2",
        getEventColorClasses(event.color),
        getBorderRadiusClasses(isFirstDay, isLastDay),
        className
      )}
      data-dragging={isDragging || undefined}
      data-past-event={isEventInPast || undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface EventItemProps {
  event: CalendarEvent
  view: "month" | "week" | "day" | "agenda"
  isDragging?: boolean
  onClick?: (e: React.MouseEvent) => void
  showTime?: boolean
  currentTime?: Date
  isFirstDay?: boolean
  isLastDay?: boolean
  children?: React.ReactNode
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export function EventItem({
  event,
  view,
  isDragging,
  onClick,
  showTime,
  currentTime,
  isFirstDay = true,
  isLastDay = true,
  children,
  className,
}: EventItemProps) {
  const eventColor = event.color

  const displayStart = useMemo(() => {
    return currentTime || new Date(event.start)
  }, [currentTime, event.start])

  const displayEnd = useMemo(() => {
    return currentTime
      ? new Date(
          new Date(currentTime).getTime() +
            (new Date(event.end).getTime() - new Date(event.start).getTime())
        )
      : new Date(event.end)
  }, [currentTime, event.start, event.end])

  const durationMinutes = useMemo(() => {
    return differenceInMinutes(displayEnd, displayStart)
  }, [displayStart, displayEnd])

  const getEventTime = () => {
    if (event.allDay) return "All day"

    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart)
    }

    return `${formatTimeWithOptionalMinutes(displayStart)} - ${formatTimeWithOptionalMinutes(displayEnd)}`
  }

  if (view === "month") {
    return (
      <EventWrapper
        event={event}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        className={cn(
          "mt-[var(--event-gap)] h-full py-0.5 items-center gap-1 text-[10px] sm:text-xs",
          className
        )}
        currentTime={currentTime}
      >
        {children || (
          <div className="flex min-w-0 flex-col w-full">
            <div className="flex items-center">
              {!event.allDay && (
                <span className="font-normal opacity-70 sm:text-[11px]">
                  {formatTimeWithOptionalMinutes(displayStart)}
                </span>
              )}
              {event.tag && (
                  <EventTag label={event.tag.label} color={event.tag.color} className="ml-auto" />
              )}
            </div>
            <span className="font-medium">{event.title}</span>
          </div>
        )}
      </EventWrapper>
    )
  }

  if (view === "week" || view === "day") {
    return (
      <EventWrapper
        event={event}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        className={cn(
          "py-1",
          durationMinutes < 45 ? "items-center" : "flex-col",
          view === "week" ? "text-[10px] sm:text-xs" : "text-xs",
          className
        )}
        currentTime={currentTime}
      >
        {durationMinutes < 45 ? (
          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate">
              {event.title}{" "}
              {showTime && (
                <span className="opacity-70">
                  {formatTimeWithOptionalMinutes(displayStart)}
                </span>
              )}
            </span>
            {event.tag && (
              <EventTag label={event.tag.label} color={event.tag.color} />
            )}
          </div>
        ) : (
          <>
            <div className="flex min-w-0 items-center gap-1">
              <span className="truncate font-medium">{event.title}</span>
              {event.tag && (
                <EventTag label={event.tag.label} color={event.tag.color} />
              )}
            </div>
            {showTime && (
              <div className="truncate font-normal opacity-70 sm:text-[11px]">
                {getEventTime()}
              </div>
            )}
          </>
        )}
      </EventWrapper>
    )
  }

  // Agenda view
  return (
    <button
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col gap-1 rounded p-2 text-left transition outline-none focus-visible:ring-[3px] [&[data-past-event]]:opacity-90",
        getEventColorClasses(eventColor),
        className
      )}
      data-past-event={isPast(new Date(event.end)) || undefined}
      onClick={onClick}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">{event.title}</span>
        {event.tag && (
          <EventTag label={event.tag.label} color={event.tag.color} />
        )}
      </div>
      <div className="text-xs opacity-70">
        {event.allDay ? (
          <span>All day</span>
        ) : (
          <span className="uppercase">
            {formatTimeWithOptionalMinutes(displayStart)} -{" "}
            {formatTimeWithOptionalMinutes(displayEnd)}
          </span>
        )}
        {event.location && (
          <>
            <span className="px-1 opacity-35"> · </span>
            <span>{event.location}</span>
          </>
        )}
      </div>
      {event.description && (
        <div className="my-1 text-xs opacity-90">{event.description}</div>
      )}
    </button>
  )
}
