import { type ReactNode } from "react";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { CalendarEvent } from "./types";
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
export declare const useCalendarDnd: () => CalendarDndContextType;
interface CalendarDndProviderProps {
    children: ReactNode;
    onEventUpdate: (event: CalendarEvent) => void;
}
export declare function CalendarDndProvider({ children, onEventUpdate, }: CalendarDndProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
