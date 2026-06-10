import { isSameDay } from "date-fns"

import { cn } from "./lib/utils"
import type { CalendarEvent, CalendarVariant, EventColor } from "./types"

/**
 * Status → theme semantic key. Every variant is built from theme variables only
 * (no raw Tailwind palette), so the calendar tracks the active theme and its
 * scoped dark contexts. The incoming `color` is the generic status hue set by
 * the consumer; we fold it onto the theme's semantic tokens:
 *   COMPLETED→success · RUNNING→warning · FAILED→destructive ·
 *   SCHEDULED→highlight · everything else→muted.
 *
 * IMPORTANT: the *-Classes helpers below return complete literal class strings.
 * Tailwind only generates class names it can see verbatim in source — never
 * interpolate a token into a class name (`border-l-${key}` would be dropped).
 */
type StatusKey = "success" | "warning" | "destructive" | "highlight" | "muted"

function statusKey(color?: EventColor | string): StatusKey {
  switch (color) {
    case "green":
    case "green-dark":
    case "emerald":
      return "success"
    case "red":
    case "red-light":
    case "rose":
      return "destructive"
    case "yellow":
    case "amber":
    case "orange":
      return "warning"
    case "sky":
    case "blue":
    case "violet":
      return "highlight"
    default:
      return "muted"
  }
}

/**
 * Full event surface + status treatment for an event pill, per variant — all
 * theme tokens. soft: neutral card with a colored status edge. minimal: flat
 * muted fill with a status edge. terminal: sharp, mono, hard status border.
 */
export function getEventClasses(
  color?: EventColor | string,
  variant: CalendarVariant = "soft"
): string {
  switch (variant) {
    case "terminal":
      return cn(
        "bg-secondary text-foreground border font-mono uppercase tracking-tight",
        getStatusBorderClasses(color)
      )
    case "minimal":
      // No fill — just a status-colored left border (matches the legend) and
      // foreground text. Hover gets a faint surface so the lift reads.
      return cn(
        "bg-transparent text-foreground border-l-2 hover:bg-accent/60",
        getStatusAccentClasses(color)
      )
    case "soft":
    default:
      return cn(
        "bg-card text-card-foreground border border-border border-l-[3px] shadow-sm hover:bg-accent hover:text-accent-foreground",
        getStatusAccentClasses(color)
      )
  }
}

/** Left status edge (soft + minimal). Theme tokens, literal classes. */
export function getStatusAccentClasses(color?: EventColor | string): string {
  switch (statusKey(color)) {
    case "success":
      return "border-l-success"
    case "warning":
      return "border-l-warning"
    case "destructive":
      return "border-l-destructive"
    case "highlight":
      return "border-l-highlight"
    case "muted":
    default:
      return "border-l-muted-foreground"
  }
}

/** All-sides status border (terminal). Theme tokens, literal classes. */
export function getStatusBorderClasses(color?: EventColor | string): string {
  switch (statusKey(color)) {
    case "success":
      return "border-success"
    case "warning":
      return "border-warning"
    case "destructive":
      return "border-destructive"
    case "highlight":
      return "border-highlight"
    case "muted":
    default:
      return "border-muted-foreground"
  }
}

/** Solid status dot fill (for legends). Theme tokens, literal classes. */
export function getStatusDotClasses(color?: EventColor | string): string {
  switch (statusKey(color)) {
    case "success":
      return "bg-success"
    case "warning":
      return "bg-warning"
    case "destructive":
      return "bg-destructive"
    case "highlight":
      return "bg-highlight"
    case "muted":
    default:
      return "bg-muted-foreground"
  }
}

/** Status badge fill + text. Theme tokens, literal classes. */
export function getStatusTagClasses(color?: EventColor | string): string {
  switch (statusKey(color)) {
    case "success":
      return "bg-success/15 text-success"
    case "warning":
      return "bg-warning/15 text-warning"
    case "destructive":
      return "bg-destructive/15 text-destructive"
    case "highlight":
      return "bg-highlight/15 text-highlight"
    case "muted":
    default:
      return "bg-muted text-muted-foreground"
  }
}

/**
 * Per-variant chrome for a tag badge — radius and typeface only; color comes
 * from getStatusTagClasses.
 */
export function getTagChromeClasses(
  variant: CalendarVariant = "soft"
): string {
  switch (variant) {
    case "terminal":
      return "rounded-none font-mono uppercase"
    case "minimal":
    case "soft":
    default:
      return "rounded"
  }
}

/**
 * Get CSS classes for event colors
 */
export function getEventColorClasses(color?: EventColor | string): string {
  const eventColor = color || "sky"

  switch (eventColor) {
    case "sky":
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8"
    case "amber":
      return "bg-amber-200/50 hover:bg-amber-200/40 text-amber-950/80 dark:bg-amber-400/25 dark:hover:bg-amber-400/20 dark:text-amber-200 shadow-amber-700/8"
    case "violet":
      return "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-violet-700/8"
    case "rose":
      return "bg-rose-200/50 hover:bg-rose-200/40 text-rose-950/80 dark:bg-rose-400/25 dark:hover:bg-rose-400/20 dark:text-rose-200 shadow-rose-700/8"
    case "emerald":
      return "bg-emerald-200/50 hover:bg-emerald-200/40 text-emerald-950/80 dark:bg-emerald-400/25 dark:hover:bg-emerald-400/20 dark:text-emerald-200 shadow-emerald-700/8"
    case "orange":
      return "bg-orange-200/50 hover:bg-orange-200/40 text-orange-950/80 dark:bg-orange-400/25 dark:hover:bg-orange-400/20 dark:text-orange-200 shadow-orange-700/8"
    case "gray":
      return "text-zinc-700 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400"
    case "black":
      return "bg-black text-gray-400"
    case "green":
      return "bg-green-500/20 dark:bg-green-500/30 text-green-800 dark:text-green-400"
    case "green-dark":
      return "bg-green-100 dark:bg-emerald-600 dark:bg-opacity-70 text-green-800 dark:text-white"
    case "red":
      return "bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-500 "
    case "red-light":
      return "bg-red-400 bg-opacity-10 text-red-500"
    case "blue":
      return "bg-blue-100  dark:bg-blue-500 text-highlight dark:text-blue-100"
    case "yellow":
      return "bg-yellow-500/20 dark:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400"
    default:
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8"
  }
}

/**
 * Get CSS classes for tag badge colors
 */
export function getTagColorClasses(color?: string): string {
  switch (color) {
    case "sky":
      return "bg-sky-300/40 text-sky-900 dark:bg-sky-400/20 dark:text-sky-200"
    case "amber":
      return "bg-amber-300/40 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200"
    case "violet":
      return "bg-violet-300/40 text-violet-900 dark:bg-violet-400/20 dark:text-violet-200"
    case "rose":
      return "bg-rose-300/40 text-rose-900 dark:bg-rose-400/20 dark:text-rose-200"
    case "emerald":
      return "bg-emerald-300/40 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200"
    case "orange":
      return "bg-orange-300/40 text-orange-900 dark:bg-orange-400/20 dark:text-orange-200"
    case "red":
      return "bg-red-300/40 text-red-900 dark:bg-red-400/20 dark:text-red-200"
    case "green":
      return "bg-green-300/40 text-green-900 dark:bg-green-400/20 dark:text-green-200"
    case "blue":
      return "bg-blue-300/40 text-blue-900 dark:bg-blue-400/20 dark:text-blue-200"
    case "yellow":
      return "bg-yellow-300/40 text-yellow-900 dark:bg-yellow-400/20 dark:text-yellow-200"
    default:
      return "bg-black/10 text-current dark:bg-white/10"
  }
}

/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export function getBorderRadiusClasses(
  isFirstDay: boolean,
  isLastDay: boolean,
  variant: CalendarVariant = "soft"
): string {
  // The terminal variant is always square, including across multi-day spans.
  if (variant === "terminal") {
    return "rounded-none"
  }
  if (isFirstDay && isLastDay) {
    return "rounded" // Both ends rounded
  } else if (isFirstDay) {
    return "rounded-l rounded-r-none" // Only left end rounded
  } else if (isLastDay) {
    return "rounded-r rounded-l-none" // Only right end rounded
  } else {
    return "rounded-none" // No rounded corners
  }
}

/**
 * Check if an event is a multi-day event
 */
export function isMultiDayEvent(event: CalendarEvent): boolean {
  const eventStart = new Date(event.start)
  const eventEnd = new Date(event.end)
  return event.allDay || eventStart.getDate() !== eventEnd.getDate()
}

/**
 * Filter events for a specific day
 */
export function getEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events
    .filter((event) => {
      const eventStart = new Date(event.start)
      return isSameDay(day, eventStart)
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

/**
 * Sort events with multi-day events first, then by start time
 */
export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const aIsMultiDay = isMultiDayEvent(a)
    const bIsMultiDay = isMultiDayEvent(b)

    if (aIsMultiDay && !bIsMultiDay) return -1
    if (!aIsMultiDay && bIsMultiDay) return 1

    return new Date(a.start).getTime() - new Date(b.start).getTime()
  })
}

/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
export function getSpanningEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events.filter((event) => {
    if (!isMultiDayEvent(event)) return false

    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)

    // Only include if it's not the start day but is either the end day or a middle day
    return (
      !isSameDay(day, eventStart) &&
      (isSameDay(day, eventEnd) || (day > eventStart && day < eventEnd))
    )
  })
}

/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export function getAllEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events.filter((event) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    return (
      isSameDay(day, eventStart) ||
      isSameDay(day, eventEnd) ||
      (day > eventStart && day < eventEnd)
    )
  })
}

/**
 * Get all events for a day (for agenda view)
 */
export function getAgendaEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events
    .filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      return (
        isSameDay(day, eventStart) ||
        isSameDay(day, eventEnd) ||
        (day > eventStart && day < eventEnd)
      )
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}
