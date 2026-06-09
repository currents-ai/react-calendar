import { type ReactNode } from "react";
import { CalendarEvent, CalendarVariant, CalendarView } from "./types";
import { type CalendarConfig } from "./variant-context";
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
    showViewSwitcher?: boolean;
    showTodayButton?: boolean;
    showNewEventButton?: boolean;
    eventHeight?: number;
    eventGap?: number;
    weekCellsHeight?: number;
    agendaDaysToShow?: number;
    variant?: CalendarVariant;
    /** Consumer-owned event content + interaction tweaks (see CalendarConfig). */
    renderEventContent?: CalendarConfig["renderEventContent"];
    hideDragHandle?: boolean;
    liftOnHover?: boolean;
    /** Slot rendered in the header's right side (e.g. a legend), vertically
     *  centered with the title/nav. */
    headerActions?: ReactNode;
}
export declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, className, initialView, onEventCreate, onEventSelect, showViewSwitcher, showNewEventButton, eventHeight, eventGap, weekCellsHeight, agendaDaysToShow, variant, renderEventContent, hideDragHandle, liftOnHover, headerActions, }: EventCalendarProps): import("react/jsx-runtime").JSX.Element;
