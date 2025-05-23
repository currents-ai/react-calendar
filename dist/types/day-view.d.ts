import { CalendarEvent } from "./types";
interface DayViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
export declare function DayView({ currentDate, events, onEventSelect, onEventCreate, }: DayViewProps): import("react/jsx-runtime").JSX.Element;
export {};
