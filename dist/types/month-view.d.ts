import { EventCalendarProps } from "./event-calendar";
import { CalendarEvent } from "./types";
interface MonthViewProps extends Pick<EventCalendarProps, "eventHeight" | "eventGap" | "showNewEventButton"> {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
export declare function MonthView({ currentDate, events, onEventSelect, onEventCreate, eventHeight, eventGap, showNewEventButton, }: MonthViewProps): import("react/jsx-runtime").JSX.Element;
export {};
