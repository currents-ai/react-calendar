import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type CalendarView = "month" | "week" | "day" | "agenda";
/**
 * Visual language of the calendar.
 * - `soft`     pastel, rounded, glassy backdrop-blur (the original look)
 * - `minimal`  flat, no blur/shadow, left accent bar — clean and dense
 * - `terminal` sharp corners, hard borders, mono type — matches the agent surface idiom
 */
type CalendarVariant = "soft" | "minimal" | "terminal";
interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    color?: EventColor;
    location?: string;
    tag?: {
        label: string;
        color?: EventColor;
    };
}
type EventColor = "sky" | "amber" | "violet" | "rose" | "emerald" | "orange" | "gray" | "black" | "green" | "green-dark" | "red" | "red-light" | "blue" | "yellow";

interface AgendaViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
}
declare function AgendaView({ currentDate, events, onEventSelect, }: AgendaViewProps): react_jsx_runtime.JSX.Element;

interface DayViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
declare function DayView({ currentDate, events, onEventSelect, onEventCreate, }: DayViewProps): react_jsx_runtime.JSX.Element;

interface DraggableEventProps {
    event: CalendarEvent;
    view: "month" | "week" | "day";
    showTime?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    height?: number;
    isFirstDay?: boolean;
    isLastDay?: boolean;
    "aria-hidden"?: boolean | "true" | "false";
}
declare function DraggableEvent({ event, view, showTime, onClick, height, isFirstDay, isLastDay, "aria-hidden": ariaHidden, }: DraggableEventProps): react_jsx_runtime.JSX.Element;

interface DroppableCellProps {
    id: string;
    date: Date;
    time?: number;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
declare function DroppableCell({ id, date, time, children, className, onClick, }: DroppableCellProps): react_jsx_runtime.JSX.Element;

interface EventItemProps {
    event: CalendarEvent;
    view: "month" | "week" | "day" | "agenda";
    isDragging?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    showTime?: boolean;
    currentTime?: Date;
    isFirstDay?: boolean;
    isLastDay?: boolean;
    children?: React.ReactNode;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
}
declare function EventItem({ event, view, isDragging, onClick, showTime, currentTime, isFirstDay, isLastDay, children, className, }: EventItemProps): react_jsx_runtime.JSX.Element;

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
interface CalendarEventRenderContext {
    view: CalendarView;
    displayStart: Date;
    displayEnd: Date;
    durationMinutes: number;
}
interface CalendarConfig {
    variant: CalendarVariant;
    renderEventContent?: (event: CalendarEvent, ctx: CalendarEventRenderContext) => React.ReactNode;
    hideDragHandle?: boolean;
    liftOnHover?: boolean;
}
declare function CalendarConfigProvider({ config, children, }: {
    config: CalendarConfig;
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useCalendarConfig(): CalendarConfig;
/** Convenience selector for the common case. */
declare function useCalendarVariant(): CalendarVariant;

interface EventCalendarProps {
    events?: CalendarEvent[];
    onEventAdd?: (event: CalendarEvent) => void;
    onEventUpdate?: (event: CalendarEvent) => void;
    onEventDelete?: (eventId: string) => void;
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
    onEventDragEnd?: (event: CalendarEvent) => void;
    onEventDragStart?: (event: CalendarEvent) => void;
    onEventDrop?: (event: CalendarEvent) => void;
    onEventResize?: (event: CalendarEvent) => void;
    onEventResizeStart?: (event: CalendarEvent) => void;
    onEventResizeEnd?: (event: CalendarEvent) => void;
    className?: string;
    initialView?: CalendarView;
    showViewSwitcher?: boolean;
    showTodayButton?: boolean;
    showNewEventButton?: boolean;
    eventHeight?: number;
    eventGap?: number;
    weekCellsHeight?: number;
    agendaDaysToShow?: number;
    variant?: CalendarVariant;
    /** Consumer-owned event content + interaction tweaks (see CalendarConfig). */
    renderEventContent?: CalendarConfig["renderEventContent"];
    hideDragHandle?: boolean;
    liftOnHover?: boolean;
    /** Slot rendered in the header's right side (e.g. a legend), vertically
     *  centered with the title/nav. */
    headerActions?: ReactNode;
}
declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, className, initialView, onEventCreate, onEventSelect, showViewSwitcher, showNewEventButton, eventHeight, eventGap, weekCellsHeight, agendaDaysToShow, variant, renderEventContent, hideDragHandle, liftOnHover, headerActions, }: EventCalendarProps): react_jsx_runtime.JSX.Element;

interface MonthViewProps extends Pick<EventCalendarProps, "eventHeight" | "eventGap" | "showNewEventButton"> {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
declare function MonthView({ currentDate, events, onEventSelect, onEventCreate, eventHeight, eventGap, showNewEventButton, }: MonthViewProps): react_jsx_runtime.JSX.Element;

interface WeekViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
declare function WeekView({ currentDate, events, onEventSelect, onEventCreate, }: WeekViewProps): react_jsx_runtime.JSX.Element;

type CalendarDndContextType = {
    activeEvent: CalendarEvent | null;
    activeId: string | number | null;
    currentTime: Date | null;
};
declare const useCalendarDnd: () => CalendarDndContextType;
interface CalendarDndProviderProps {
    children: ReactNode;
    onEventUpdate: (event: CalendarEvent) => void;
}
declare function CalendarDndProvider({ children, onEventUpdate, }: CalendarDndProviderProps): react_jsx_runtime.JSX.Element;

declare const EventHeight = 24;
declare const EventGap = 4;
declare const WeekCellsHeight = 72;
declare const AgendaDaysToShow = 30;
declare const StartHour = 0;
declare const EndHour = 24;
declare const DefaultStartHour = 9;
declare const DefaultEndHour = 10;

/**
 * Full event surface + status treatment for an event pill, per variant — all
 * theme tokens. soft: neutral card with a colored status edge. minimal: flat
 * muted fill with a status edge. terminal: sharp, mono, hard status border.
 */
declare function getEventClasses(color?: EventColor | string, variant?: CalendarVariant): string;
/** Left status edge (soft + minimal). Theme tokens, literal classes. */
declare function getStatusAccentClasses(color?: EventColor | string): string;
/** All-sides status border (terminal). Theme tokens, literal classes. */
declare function getStatusBorderClasses(color?: EventColor | string): string;
/** Solid status dot fill (for legends). Theme tokens, literal classes. */
declare function getStatusDotClasses(color?: EventColor | string): string;
/** Status badge fill + text. Theme tokens, literal classes. */
declare function getStatusTagClasses(color?: EventColor | string): string;
/**
 * Per-variant chrome for a tag badge — radius and typeface only; color comes
 * from getStatusTagClasses.
 */
declare function getTagChromeClasses(variant?: CalendarVariant): string;
/**
 * Get CSS classes for event colors
 */
declare function getEventColorClasses(color?: EventColor | string): string;
/**
 * Get CSS classes for tag badge colors
 */
declare function getTagColorClasses(color?: string): string;
/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
declare function getBorderRadiusClasses(isFirstDay: boolean, isLastDay: boolean, variant?: CalendarVariant): string;
/**
 * Check if an event is a multi-day event
 */
declare function isMultiDayEvent(event: CalendarEvent): boolean;
/**
 * Filter events for a specific day
 */
declare function getEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Sort events with multi-day events first, then by start time
 */
declare function sortEvents(events: CalendarEvent[]): CalendarEvent[];
/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
declare function getSpanningEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
declare function getAllEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Get all events for a day (for agenda view)
 */
declare function getAgendaEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];

declare function useCurrentTimeIndicator(currentDate: Date, view: "day" | "week"): {
    currentTimePosition: number;
    currentTimeVisible: boolean;
};

interface EventVisibilityOptions {
    eventHeight: number;
    eventGap: number;
}
interface EventVisibilityResult {
    contentRef: React.RefObject<HTMLDivElement>;
    contentHeight: number | null;
    getVisibleEventCount: (totalEvents: number) => number;
}
/**
 * Hook for calculating event visibility based on container height
 * Uses ResizeObserver for efficient updates
 */
declare function useEventVisibility({ eventHeight, eventGap, }: EventVisibilityOptions): EventVisibilityResult;

export { AgendaDaysToShow, AgendaView, CalendarConfigProvider, CalendarDndProvider, DayView, DefaultEndHour, DefaultStartHour, DraggableEvent, DroppableCell, EndHour, EventCalendar, EventGap, EventHeight, EventItem, MonthView, StartHour, WeekCellsHeight, WeekView, getAgendaEventsForDay, getAllEventsForDay, getBorderRadiusClasses, getEventClasses, getEventColorClasses, getEventsForDay, getSpanningEventsForDay, getStatusAccentClasses, getStatusBorderClasses, getStatusDotClasses, getStatusTagClasses, getTagChromeClasses, getTagColorClasses, isMultiDayEvent, sortEvents, useCalendarConfig, useCalendarDnd, useCalendarVariant, useCurrentTimeIndicator, useEventVisibility };
export type { CalendarConfig, CalendarEvent, CalendarEventRenderContext, CalendarVariant, CalendarView, EventColor };
