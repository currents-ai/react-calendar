import type { CalendarEvent, CalendarVariant, CalendarView } from "./types";
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
    view: CalendarView;
    displayStart: Date;
    displayEnd: Date;
    durationMinutes: number;
}
export interface CalendarConfig {
    variant: CalendarVariant;
    renderEventContent?: (event: CalendarEvent, ctx: CalendarEventRenderContext) => React.ReactNode;
    hideDragHandle?: boolean;
    liftOnHover?: boolean;
}
export declare function CalendarConfigProvider({ config, children, }: {
    config: CalendarConfig;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useCalendarConfig(): CalendarConfig;
/** Convenience selector for the common case. */
export declare function useCalendarVariant(): CalendarVariant;
