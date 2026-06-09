import { useDraggable } from "@dnd-kit/react"

import { useCalendarDnd } from "./calendar-dnd-context"
import { cn } from "./lib/utils"
import { EventItem } from "./event-item"
import { CalendarEvent } from "./types"
import { useCalendarConfig } from "./variant-context"

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
  const { hideDragHandle } = useCalendarConfig()

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
      {/* Drag handle. Default: a grip that fades in on hover (overlay, no
          reflow). When hideDragHandle is set, the grip is gone but the strip
          still initiates drag — discoverability comes from the hover lift. */}
      <div
        ref={handleRef}
        className={cn(
          "absolute left-0 top-0 bottom-0 z-10 w-4 cursor-grab active:cursor-grabbing",
          !hideDragHandle &&
            "flex items-center justify-center opacity-0 transition-opacity group-hover/drag:opacity-50"
        )}
        aria-label="Drag to move event"
      >
        {!hideDragHandle && <GripIcon />}
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
      />
    </div>
  )
}
