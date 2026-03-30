export type CalendarView = "month" | "week" | "day" | "agenda"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColor
  location?: string
  tag?: {
    label: string
    color?: EventColor
  }
}

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | "gray"
  | "black"
  | "green"
  | "green-dark"
  | "red"
  | "red-light"
  | "blue"
  | "yellow"
