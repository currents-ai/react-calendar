import { CalendarEvent } from "./types";
interface MonthViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
export declare function MonthView({ currentDate, events, onEventSelect, onEventCreate, }: MonthViewProps): import("react/jsx-runtime").JSX.Element;
export {};
