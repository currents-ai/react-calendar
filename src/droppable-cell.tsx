import { useDroppable } from "@dnd-kit/react"

import { useCalendarDnd } from "./calendar-dnd-context"
import { cn } from "./lib/utils"

interface DroppableCellProps {
  id: string
  date: Date
  time?: number
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function DroppableCell({
  id,
  date,
  time,
  children,
  className,
  onClick,
}: DroppableCellProps) {
  const { activeEvent } = useCalendarDnd()

  const { ref, isDropTarget } = useDroppable({
    id,
    data: {
      date,
      time,
    },
  })

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "flex h-full flex-col overflow-hidden px-0.5 py-1 transition-colors sm:px-1",
        isDropTarget && activeEvent && "bg-primary/10 dark:bg-primary/15",
        className
      )}
    >
      {children}
    </div>
  )
}
