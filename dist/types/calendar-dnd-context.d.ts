import { type ReactNode } from "react";
import { CalendarEvent } from "./types";
type CalendarDndContextType = {
    activeEvent: CalendarEvent | null;
    activeId: string | number | null;
    currentTime: Date | null;
};
export declare const useCalendarDnd: () => CalendarDndContextType;
interface CalendarDndProviderProps {
    children: ReactNode;
    onEventUpdate: (event: CalendarEvent) => void;
}
export declare function CalendarDndProvider({ children, onEventUpdate, }: CalendarDndProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
