import { CalendarEvent, CalendarView } from "./types";
export interface EventCalendarProps {
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
export declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, className, initialView, onEventCreate, onEventSelect, showViewSwitcher, showNewEventButton, eventHeight, eventGap, weekCellsHeight, agendaDaysToShow, }: EventCalendarProps): import("react/jsx-runtime").JSX.Element;
