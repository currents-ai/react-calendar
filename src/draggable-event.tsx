import { useDraggable } from "@dnd-kit/react"

import { useCalendarDnd } from "./calendar-dnd-context"
import { EventItem } from "./event-item"
import { CalendarEvent } from "./types"

interface DraggableEventProps {
  event: CalendarEvent
  view: "month" | "week" | "day"
  showTime?: boolean
  onClick?: (e: React.MouseEvent) => void
  height?: number
  isFirstDay?: boolean
  isLastDay?: boolean
  "aria-hidden"?: boolean | "true" | "false"
}

function GripIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <circle cx="9" cy="12" r="2" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="9" cy="18" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="15" cy="18" r="2" />
    </svg>
  )
}

export function DraggableEvent({
  event,
  view,
  showTime,
  onClick,
  height,
  isFirstDay = true,
  isLastDay = true,
  "aria-hidden": ariaHidden,
}: DraggableEventProps) {
  const { activeId } = useCalendarDnd()

  const { ref, handleRef, isDragSource } = useDraggable({
    id: `${event.id}-${view}`,
    data: {
      event,
      view,
    },
  })

  const isDragging = isDragSource || activeId === `${event.id}-${view}`

  return (
    <div
      ref={ref}
      className="group/drag relative"
      style={{
        height: height || "auto",
        opacity: isDragging ? 0.3 : undefined,
      }}
    >
      {/* Drag handle - visible on hover */}
      <div
        ref={handleRef}
        className="absolute -left-0.5 top-0 bottom-0 z-10 flex w-5 cursor-grab items-center justify-center rounded-l opacity-0 transition-opacity group-hover/drag:opacity-60 active:cursor-grabbing"
        aria-label="Drag to move event"
      >
        <GripIcon />
      </div>

      <EventItem
        event={event}
        view={view}
        showTime={showTime}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        aria-hidden={ariaHidden}
        className="group-hover/drag:pl-3.5 sm:group-hover/drag:pl-4"
      />
    </div>
  )
}
