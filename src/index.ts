// Component exports
export { AgendaView } from "./agenda-view"
export { DayView } from "./day-view"
export { DraggableEvent } from "./draggable-event"
export { DroppableCell } from "./droppable-cell"
export { EventItem } from "./event-item"
export { EventCalendar } from "./event-calendar"
export { MonthView } from "./month-view"
export { WeekView } from "./week-view"
export { CalendarDndProvider, useCalendarDnd } from "./calendar-dnd-context"
export {
  CalendarConfigProvider,
  useCalendarConfig,
  useCalendarVariant,
} from "./variant-context"
export type {
  CalendarConfig,
  CalendarEventRenderContext,
} from "./variant-context"

// Constants and utility exports
export * from "./constants"
export * from "./utils"

// Hook exports
export * from "./hooks/use-current-time-indicator"
export * from "./hooks/use-event-visibility"

// Type exports
export type {
  CalendarEvent,
  CalendarVariant,
  CalendarView,
  EventColor,
} from "./types"
