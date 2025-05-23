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
}
export declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, className, initialView, onEventCreate, onEventSelect, }: EventCalendarProps): import("react/jsx-runtime").JSX.Element;
