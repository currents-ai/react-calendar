import * as react_jsx_runtime from 'react/jsx-runtime';
import { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { ReactNode } from 'react';

type CalendarView = "month" | "week" | "day" | "agenda";
interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    color?: EventColor;
    location?: string;
}
type EventColor = "sky" | "amber" | "violet" | "rose" | "emerald" | "orange";

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
    isMultiDay?: boolean;
    multiDayWidth?: number;
    isFirstDay?: boolean;
    isLastDay?: boolean;
    "aria-hidden"?: boolean | "true" | "false";
}
declare function DraggableEvent({ event, view, showTime, onClick, height, isMultiDay, multiDayWidth, isFirstDay, isLastDay, "aria-hidden": ariaHidden, }: DraggableEventProps): react_jsx_runtime.JSX.Element;

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
    dndListeners?: SyntheticListenerMap;
    dndAttributes?: DraggableAttributes;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}
declare function EventItem({ event, view, isDragging, onClick, showTime, currentTime, isFirstDay, isLastDay, children, className, dndListeners, dndAttributes, onMouseDown, onTouchStart, }: EventItemProps): react_jsx_runtime.JSX.Element;

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
}
declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, className, initialView, onEventCreate, onEventSelect, showViewSwitcher, showNewEventButton, eventHeight, eventGap, weekCellsHeight, agendaDaysToShow, }: EventCalendarProps): react_jsx_runtime.JSX.Element;

interface MonthViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
declare function MonthView({ currentDate, events, onEventSelect, onEventCreate, }: MonthViewProps): react_jsx_runtime.JSX.Element;

interface WeekViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
declare function WeekView({ currentDate, events, onEventSelect, onEventCreate, }: WeekViewProps): react_jsx_runtime.JSX.Element;

type CalendarDndContextType = {
    activeEvent: CalendarEvent | null;
    activeId: UniqueIdentifier | null;
    activeView: "month" | "week" | "day" | null;
    currentTime: Date | null;
    eventHeight: number | null;
    isMultiDay: boolean;
    multiDayWidth: number | null;
    dragHandlePosition: {
        x?: number;
        y?: number;
        data?: {
            isFirstDay?: boolean;
            isLastDay?: boolean;
        };
    } | null;
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
 * Get CSS classes for event colors
 */
declare function getEventColorClasses(color?: EventColor | string): string;
/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
declare function getBorderRadiusClasses(isFirstDay: boolean, isLastDay: boolean): string;
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

export { AgendaDaysToShow, AgendaView, CalendarDndProvider, DayView, DefaultEndHour, DefaultStartHour, DraggableEvent, DroppableCell, EndHour, EventCalendar, EventGap, EventHeight, EventItem, MonthView, StartHour, WeekCellsHeight, WeekView, getAgendaEventsForDay, getAllEventsForDay, getBorderRadiusClasses, getEventColorClasses, getEventsForDay, getSpanningEventsForDay, isMultiDayEvent, sortEvents, useCalendarDnd, useCurrentTimeIndicator, useEventVisibility };
export type { CalendarEvent, CalendarView, EventColor };
