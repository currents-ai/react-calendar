import { CalendarEvent } from "./types";
interface AgendaViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect?: (event: CalendarEvent) => void;
}
export declare function AgendaView({ currentDate, events, onEventSelect, }: AgendaViewProps): import("react/jsx-runtime").JSX.Element;
export {};
