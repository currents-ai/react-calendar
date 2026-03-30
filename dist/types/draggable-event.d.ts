import { CalendarEvent } from "./types";
interface DraggableEventProps {
    event: CalendarEvent;
    view: "month" | "week" | "day";
    showTime?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    height?: number;
    isFirstDay?: boolean;
    isLastDay?: boolean;
    "aria-hidden"?: boolean | "true" | "false";
}
export declare function DraggableEvent({ event, view, showTime, onClick, height, isFirstDay, isLastDay, "aria-hidden": ariaHidden, }: DraggableEventProps): import("react/jsx-runtime").JSX.Element;
export {};
