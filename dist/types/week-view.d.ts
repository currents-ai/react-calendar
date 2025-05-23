import { CalendarEvent } from "./types";
interface WeekViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: Date) => void;
}
export declare function WeekView({ currentDate, events, onEventSelect, onEventCreate, }: WeekViewProps): import("react/jsx-runtime").JSX.Element;
export {};
