export type CalendarView = "month" | "week" | "day" | "agenda"

/**
 * Visual language of the calendar.
 * - `soft`     pastel, rounded, glassy backdrop-blur (the original look)
 * - `minimal`  flat, no blur/shadow, left accent bar — clean and dense
 * - `terminal` sharp corners, hard borders, mono type — matches the agent surface idiom
 */
export type CalendarVariant = "soft" | "minimal" | "terminal"

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
