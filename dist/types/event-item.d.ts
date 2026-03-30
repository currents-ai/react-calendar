import { CalendarEvent } from "./types";
interface EventItemProps {
    event: CalendarEvent;
    view: "month" | "week" | "day" | "agenda";
    isDragging?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    showTime?: boolean;
    currentTime?: Date;
    isFirstDay?: boolean;
    isLastDay?: boolean;
    children?: React.ReactNode;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
}
export declare function EventItem({ event, view, isDragging, onClick, showTime, currentTime, isFirstDay, isLastDay, children, className, }: EventItemProps): import("react/jsx-runtime").JSX.Element;
export {};
