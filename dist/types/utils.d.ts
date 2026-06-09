import type { CalendarEvent, CalendarVariant, EventColor } from "./types";
/**
 * Full event surface + status treatment for an event pill, per variant — all
 * theme tokens. soft: neutral card with a colored status edge. minimal: flat
 * muted fill with a status edge. terminal: sharp, mono, hard status border.
 */
export declare function getEventClasses(color?: EventColor | string, variant?: CalendarVariant): string;
/** Left status edge (soft + minimal). Theme tokens, literal classes. */
export declare function getStatusAccentClasses(color?: EventColor | string): string;
/** All-sides status border (terminal). Theme tokens, literal classes. */
export declare function getStatusBorderClasses(color?: EventColor | string): string;
/** Solid status dot fill (for legends). Theme tokens, literal classes. */
export declare function getStatusDotClasses(color?: EventColor | string): string;
/** Status badge fill + text. Theme tokens, literal classes. */
export declare function getStatusTagClasses(color?: EventColor | string): string;
/**
 * Per-variant chrome for a tag badge — radius and typeface only; color comes
 * from getStatusTagClasses.
 */
export declare function getTagChromeClasses(variant?: CalendarVariant): string;
/**
 * Get CSS classes for event colors
 */
export declare function getEventColorClasses(color?: EventColor | string): string;
/**
 * Get CSS classes for tag badge colors
 */
export declare function getTagColorClasses(color?: string): string;
/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export declare function getBorderRadiusClasses(isFirstDay: boolean, isLastDay: boolean, variant?: CalendarVariant): string;
/**
 * Check if an event is a multi-day event
 */
export declare function isMultiDayEvent(event: CalendarEvent): boolean;
/**
 * Filter events for a specific day
 */
export declare function getEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Sort events with multi-day events first, then by start time
 */
export declare function sortEvents(events: CalendarEvent[]): CalendarEvent[];
/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
export declare function getSpanningEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export declare function getAllEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
/**
 * Get all events for a day (for agenda view)
 */
export declare function getAgendaEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[];
