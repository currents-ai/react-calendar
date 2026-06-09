import { createContext, useContext } from "react"

import type { CalendarEvent, CalendarVariant, CalendarView } from "./types"

/**
 * Extension points the host app can feed into the calendar without forking the
 * render code. Everything here is optional and defaults to the original
 * behaviour, so the core component stays close to upstream and easy to re-merge.
 *
 * - variant            visual language (see CalendarVariant)
 * - renderEventContent lets the consumer own the *inside* of an event pill
 *                      (e.g. time-on-top layout, no status tag). When it returns
 *                      a node that node is used; otherwise the default content.
 * - hideDragHandle     hide the grip affordance (drag still works via the strip)
 * - liftOnHover        raise the event slightly on hover instead of a handle
 */
export interface CalendarEventRenderContext {
  view: CalendarView
  displayStart: Date
  displayEnd: Date
  durationMinutes: number
}

export interface CalendarConfig {
  variant: CalendarVariant
  renderEventContent?: (
    event: CalendarEvent,
    ctx: CalendarEventRenderContext
  ) => React.ReactNode
  hideDragHandle?: boolean
  liftOnHover?: boolean
}

const DEFAULT_CONFIG: CalendarConfig = { variant: "soft" }

const CalendarConfigContext = createContext<CalendarConfig>(DEFAULT_CONFIG)

export function CalendarConfigProvider({
  config,
  children,
}: {
  config: CalendarConfig
  children: React.ReactNode
}) {
  return (
    <CalendarConfigContext.Provider value={config}>
      {children}
    </CalendarConfigContext.Provider>
  )
}

export function useCalendarConfig(): CalendarConfig {
  return useContext(CalendarConfigContext)
}

/** Convenience selector for the common case. */
export function useCalendarVariant(): CalendarVariant {
  return useContext(CalendarConfigContext).variant
}
