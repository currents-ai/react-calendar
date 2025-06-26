import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useMemo, useState, useRef, useId, createContext, useContext, useEffect, useLayoutEffect } from 'react';
import { RiCalendarEventLine, RiCalendarCheckLine } from '@remixicon/react';
import { isSameDay, differenceInMinutes, isPast, format, getMinutes, addDays, isToday, addMinutes, differenceInDays, startOfWeek, endOfWeek, isWithinInterval, startOfDay, eachHourOfInterval, addHours, getHours, areIntervalsOverlapping, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isBefore, subMonths, subWeeks, addMonths, addWeeks } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { useSensors, useSensor, MouseSensor, TouchSensor, PointerSensor, DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

var EventHeight = 24;
// Vertical gap between events in pixels - controls spacing in month view
var EventGap = 4;
// Height of hour cells in week and day views - controls the scale of time display
var WeekCellsHeight = 72;
// Number of days to show in the agenda view
var AgendaDaysToShow = 30;
// Start and end hours for the week and day views
var StartHour = 0;
var EndHour = 24;
// Default start and end times
var DefaultStartHour = 9; // 9 AM
var DefaultEndHour = 10; // 10 AM

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

function cn() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  return twMerge(clsx(inputs));
}

/**
 * Get CSS classes for event colors
 */
function getEventColorClasses(color) {
  var eventColor = color || "sky";
  switch (eventColor) {
    case "sky":
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
    case "amber":
      return "bg-amber-200/50 hover:bg-amber-200/40 text-amber-950/80 dark:bg-amber-400/25 dark:hover:bg-amber-400/20 dark:text-amber-200 shadow-amber-700/8";
    case "violet":
      return "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-violet-700/8";
    case "rose":
      return "bg-rose-200/50 hover:bg-rose-200/40 text-rose-950/80 dark:bg-rose-400/25 dark:hover:bg-rose-400/20 dark:text-rose-200 shadow-rose-700/8";
    case "emerald":
      return "bg-emerald-200/50 hover:bg-emerald-200/40 text-emerald-950/80 dark:bg-emerald-400/25 dark:hover:bg-emerald-400/20 dark:text-emerald-200 shadow-emerald-700/8";
    case "orange":
      return "bg-orange-200/50 hover:bg-orange-200/40 text-orange-950/80 dark:bg-orange-400/25 dark:hover:bg-orange-400/20 dark:text-orange-200 shadow-orange-700/8";
    case "gray":
      return "text-zinc-700 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400";
    case "black":
      return "bg-black text-gray-400";
    case "green":
      return "bg-green-500/20 dark:bg-green-500/30 text-green-800 dark:text-green-400";
    case "green-dark":
      return "bg-green-100 dark:bg-emerald-600 dark:bg-opacity-70 text-green-800 dark:text-white";
    case "red":
      return "bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-500 ";
    case "red-light":
      return "bg-red-400 bg-opacity-10 text-red-500";
    case "blue":
      return "bg-blue-100  dark:bg-blue-500 text-highlight dark:text-blue-100";
    case "yellow":
      return "bg-yellow-500/20 dark:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400";
    default:
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
  }
}
/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
function getBorderRadiusClasses(isFirstDay, isLastDay) {
  if (isFirstDay && isLastDay) {
    return "rounded"; // Both ends rounded
  } else if (isFirstDay) {
    return "rounded-l rounded-r-none"; // Only left end rounded
  } else if (isLastDay) {
    return "rounded-r rounded-l-none"; // Only right end rounded
  } else {
    return "rounded-none"; // No rounded corners
  }
}
/**
 * Check if an event is a multi-day event
 */
function isMultiDayEvent(event) {
  var eventStart = new Date(event.start);
  var eventEnd = new Date(event.end);
  return event.allDay || eventStart.getDate() !== eventEnd.getDate();
}
/**
 * Filter events for a specific day
 */
function getEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    return isSameDay(day, eventStart);
  }).sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}
/**
 * Sort events with multi-day events first, then by start time
 */
function sortEvents(events) {
  return __spreadArray([], events, true).sort(function (a, b) {
    var aIsMultiDay = isMultiDayEvent(a);
    var bIsMultiDay = isMultiDayEvent(b);
    if (aIsMultiDay && !bIsMultiDay) return -1;
    if (!aIsMultiDay && bIsMultiDay) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}
/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
function getSpanningEventsForDay(events, day) {
  return events.filter(function (event) {
    if (!isMultiDayEvent(event)) return false;
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    // Only include if it's not the start day but is either the end day or a middle day
    return !isSameDay(day, eventStart) && (isSameDay(day, eventEnd) || day > eventStart && day < eventEnd);
  });
}
/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
function getAllEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
  });
}
/**
 * Get all events for a day (for agenda view)
 */
function getAgendaEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
  }).sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}

// Using date-fns format with custom formatting:
// 'h' - hours (1-12)
// 'a' - am/pm
// ':mm' - minutes with leading zero (only if the token 'mm' is present)
var formatTimeWithOptionalMinutes = function (date) {
  return format(date, getMinutes(date) === 0 ? "ha" : "h:mma").toLowerCase();
};
// Shared wrapper component for event styling
function EventWrapper(_a) {
  var event = _a.event,
    _b = _a.isFirstDay,
    isFirstDay = _b === void 0 ? true : _b,
    _c = _a.isLastDay,
    isLastDay = _c === void 0 ? true : _c,
    isDragging = _a.isDragging,
    onClick = _a.onClick,
    className = _a.className,
    children = _a.children,
    currentTime = _a.currentTime,
    dndListeners = _a.dndListeners,
    dndAttributes = _a.dndAttributes,
    onMouseDown = _a.onMouseDown,
    onTouchStart = _a.onTouchStart;
  // Always use the currentTime (if provided) to determine if the event is in the past
  var displayEnd = currentTime ? new Date(new Date(currentTime).getTime() + (new Date(event.end).getTime() - new Date(event.start).getTime())) : new Date(event.end);
  var isEventInPast = isPast(displayEnd);
  return jsx("button", __assign({
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 overflow-wrap flex h-full w-full px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] [&[data-dragging]]:cursor-grabbing [&[data-dragging]]:shadow-lg [&[data-past-event]]:line-through sm:px-2", getEventColorClasses(event.color), getBorderRadiusClasses(isFirstDay, isLastDay), className),
    "data-dragging": isDragging || undefined,
    "data-past-event": isEventInPast || undefined,
    onClick: onClick,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }, dndListeners, dndAttributes, {
    children: children
  }));
}
function EventItem(_a) {
  var event = _a.event,
    view = _a.view,
    isDragging = _a.isDragging,
    onClick = _a.onClick,
    showTime = _a.showTime,
    currentTime = _a.currentTime,
    _b = _a.isFirstDay,
    isFirstDay = _b === void 0 ? true : _b,
    _c = _a.isLastDay,
    isLastDay = _c === void 0 ? true : _c,
    children = _a.children,
    className = _a.className,
    dndListeners = _a.dndListeners,
    dndAttributes = _a.dndAttributes,
    onMouseDown = _a.onMouseDown,
    onTouchStart = _a.onTouchStart;
  var eventColor = event.color;
  // Use the provided currentTime (for dragging) or the event's actual time
  var displayStart = useMemo(function () {
    return currentTime || new Date(event.start);
  }, [currentTime, event.start]);
  var displayEnd = useMemo(function () {
    return currentTime ? new Date(new Date(currentTime).getTime() + (new Date(event.end).getTime() - new Date(event.start).getTime())) : new Date(event.end);
  }, [currentTime, event.start, event.end]);
  // Calculate event duration in minutes
  var durationMinutes = useMemo(function () {
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd]);
  var getEventTime = function () {
    if (event.allDay) return "All day";
    // For short events (less than 45 minutes), only show start time
    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart);
    }
    // For longer events, show both start and end time
    return "".concat(formatTimeWithOptionalMinutes(displayStart), " - ").concat(formatTimeWithOptionalMinutes(displayEnd));
  };
  if (view === "month") {
    return jsx(EventWrapper, {
      event: event,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      className: cn("mt-[var(--event-gap)] h-full py-0.5 items-center text-[10px] sm:text-xs", className),
      currentTime: currentTime,
      dndListeners: dndListeners,
      dndAttributes: dndAttributes,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      children: children || jsxs("span", {
        children: [!event.allDay && jsxs("span", {
          className: "truncate font-normal opacity-70 sm:text-[11px]",
          children: [formatTimeWithOptionalMinutes(displayStart), " "]
        }), event.title]
      })
    });
  }
  if (view === "week" || view === "day") {
    return jsx(EventWrapper, {
      event: event,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      className: cn("py-1", durationMinutes < 45 ? "items-center" : "flex-col", view === "week" ? "text-[10px] sm:text-xs" : "text-xs", className),
      currentTime: currentTime,
      dndListeners: dndListeners,
      dndAttributes: dndAttributes,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      children: durationMinutes < 45 ? jsxs("div", {
        className: "truncate",
        children: [event.title, " ", showTime && jsx("span", {
          className: "opacity-70",
          children: formatTimeWithOptionalMinutes(displayStart)
        })]
      }) : jsxs(Fragment, {
        children: [jsx("div", {
          className: "truncate font-medium",
          children: event.title
        }), showTime && jsx("div", {
          className: "truncate font-normal opacity-70",
          children: getEventTime()
        })]
      })
    });
  }
  // Agenda view - kept separate since it's significantly different
  return jsxs("button", __assign({
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col gap-1 rounded p-2 text-left transition outline-none focus-visible:ring-[3px] [&[data-past-event]]:opacity-90", getEventColorClasses(eventColor), className),
    "data-past-event": isPast(new Date(event.end)) || undefined,
    onClick: onClick,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }, dndListeners, dndAttributes, {
    children: [jsx("div", {
      className: "text-sm font-medium",
      children: event.title
    }), jsxs("div", {
      className: "text-xs opacity-70",
      children: [event.allDay ? jsx("span", {
        children: "All day"
      }) : jsxs("span", {
        className: "uppercase",
        children: [formatTimeWithOptionalMinutes(displayStart), " -", " ", formatTimeWithOptionalMinutes(displayEnd)]
      }), event.location && jsxs(Fragment, {
        children: [jsx("span", {
          className: "px-1 opacity-35",
          children: " \u00B7 "
        }), jsx("span", {
          children: event.location
        })]
      })]
    }), event.description && jsx("div", {
      className: "my-1 text-xs opacity-90",
      children: event.description
    })]
  }));
}

function AgendaView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect;
  // Show events for the next days based on constant
  var days = useMemo(function () {
    console.log("Agenda view updating with date:", currentDate.toISOString());
    return Array.from({
      length: AgendaDaysToShow
    }, function (_, i) {
      return addDays(new Date(currentDate), i);
    });
  }, [currentDate]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    console.log("Agenda view event clicked:", event);
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  // Check if there are any days with events
  var hasEvents = days.some(function (day) {
    return getAgendaEventsForDay(events, day).length > 0;
  });
  return jsx("div", {
    className: "border-border/70 border-t px-4",
    children: !hasEvents ? jsxs("div", {
      className: "flex min-h-[70svh] flex-col items-center justify-center py-16 text-center",
      children: [jsx(RiCalendarEventLine, {
        size: 32,
        className: "text-muted-foreground/50 mb-2"
      }), jsx("h3", {
        className: "text-lg font-medium",
        children: "No events found"
      }), jsx("p", {
        className: "text-muted-foreground",
        children: "There are no events scheduled for this time period."
      })]
    }) : days.map(function (day) {
      var dayEvents = getAgendaEventsForDay(events, day);
      if (dayEvents.length === 0) return null;
      return jsxs("div", {
        className: "border-border/70 relative my-12 border-t",
        children: [jsx("span", {
          className: "bg-background absolute -top-3 left-0 flex h-6 items-center pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs",
          "data-today": isToday(day) || undefined,
          children: format(day, "d MMM, EEEE")
        }), jsx("div", {
          className: "mt-6 space-y-2",
          children: dayEvents.map(function (event) {
            return jsx(EventItem, {
              event: event,
              view: "agenda",
              onClick: function (e) {
                return handleEventClick(event, e);
              }
            }, event.id);
          })
        })]
      }, day.toString());
    })
  });
}

// Create the context
var CalendarDndContext = /*#__PURE__*/createContext({
  activeEvent: null,
  activeId: null,
  activeView: null,
  currentTime: null,
  eventHeight: null,
  isMultiDay: false,
  multiDayWidth: null,
  dragHandlePosition: null
});
// Hook to use the context
var useCalendarDnd = function () {
  return useContext(CalendarDndContext);
};
function CalendarDndProvider(_a) {
  var _b, _c;
  var children = _a.children,
    onEventUpdate = _a.onEventUpdate;
  var _d = useState(null),
    activeEvent = _d[0],
    setActiveEvent = _d[1];
  var _e = useState(null),
    activeId = _e[0],
    setActiveId = _e[1];
  var _f = useState(null),
    activeView = _f[0],
    setActiveView = _f[1];
  var _g = useState(null),
    currentTime = _g[0],
    setCurrentTime = _g[1];
  var _h = useState(null),
    eventHeight = _h[0],
    setEventHeight = _h[1];
  var _j = useState(false),
    isMultiDay = _j[0],
    setIsMultiDay = _j[1];
  var _k = useState(null),
    multiDayWidth = _k[0],
    setMultiDayWidth = _k[1];
  var _l = useState(null),
    dragHandlePosition = _l[0],
    setDragHandlePosition = _l[1];
  // Store original event dimensions
  var eventDimensions = useRef({
    height: 0
  });
  // Configure sensors for better drag detection
  var sensors = useSensors(useSensor(MouseSensor, {
    // Require the mouse to move by 5px before activating
    activationConstraint: {
      distance: 5
    }
  }), useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  }), useSensor(PointerSensor, {
    // Require the pointer to move by 5px before activating
    activationConstraint: {
      distance: 5
    }
  }));
  // Generate a stable ID for the DndContext
  var dndContextId = useId();
  var handleDragStart = function (event) {
    var active = event.active;
    // Add safety check for data.current
    if (!active.data.current) {
      console.error("Missing data in drag start event", event);
      return;
    }
    var _a = active.data.current,
      calendarEvent = _a.event,
      view = _a.view,
      height = _a.height,
      eventIsMultiDay = _a.isMultiDay,
      eventMultiDayWidth = _a.multiDayWidth,
      eventDragHandlePosition = _a.dragHandlePosition;
    setActiveEvent(calendarEvent);
    setActiveId(active.id);
    setActiveView(view);
    setCurrentTime(new Date(calendarEvent.start));
    setIsMultiDay(eventIsMultiDay || false);
    setMultiDayWidth(eventMultiDayWidth || null);
    setDragHandlePosition(eventDragHandlePosition || null);
    // Store event height if provided
    if (height) {
      eventDimensions.current.height = height;
      setEventHeight(height);
    }
  };
  var handleDragOver = function (event) {
    var over = event.over;
    if (over && activeEvent && over.data.current) {
      var _a = over.data.current,
        date = _a.date,
        time = _a.time;
      // Update time for week/day views
      if (time !== undefined && activeView !== "month") {
        var newTime = new Date(date);
        // Calculate hours and minutes with 15-minute precision
        var hours = Math.floor(time);
        var fractionalHour = time - hours;
        // Map to nearest 15 minute interval (0, 0.25, 0.5, 0.75)
        var minutes = 0;
        if (fractionalHour < 0.125) minutes = 0;else if (fractionalHour < 0.375) minutes = 15;else if (fractionalHour < 0.625) minutes = 30;else minutes = 45;
        newTime.setHours(hours, minutes, 0, 0);
        // Only update if time has changed
        if (!currentTime || newTime.getHours() !== currentTime.getHours() || newTime.getMinutes() !== currentTime.getMinutes() || newTime.getDate() !== currentTime.getDate() || newTime.getMonth() !== currentTime.getMonth() || newTime.getFullYear() !== currentTime.getFullYear()) {
          setCurrentTime(newTime);
        }
      } else if (activeView === "month") {
        // For month view, just update the date but preserve time
        var newTime = new Date(date);
        if (currentTime) {
          newTime.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
        // Only update if date has changed
        if (!currentTime || newTime.getDate() !== currentTime.getDate() || newTime.getMonth() !== currentTime.getMonth() || newTime.getFullYear() !== currentTime.getFullYear()) {
          setCurrentTime(newTime);
        }
      }
    }
  };
  var handleDragEnd = function (event) {
    var active = event.active,
      over = event.over;
    // Add robust error checking
    if (!over || !activeEvent || !currentTime) {
      // Reset state and exit early
      setActiveEvent(null);
      setActiveId(null);
      setActiveView(null);
      setCurrentTime(null);
      setEventHeight(null);
      setIsMultiDay(false);
      setMultiDayWidth(null);
      setDragHandlePosition(null);
      return;
    }
    try {
      // Safely access data with checks
      if (!active.data.current || !over.data.current) {
        throw new Error("Missing data in drag event");
      }
      var activeData = active.data.current;
      var overData = over.data.current;
      // Verify we have all required data
      if (!activeData.event || !overData.date) {
        throw new Error("Missing required event data");
      }
      var calendarEvent = activeData.event;
      var date = overData.date;
      var time = overData.time;
      // Calculate new start time
      var newStart = new Date(date);
      // If time is provided (for week/day views), set the hours and minutes
      if (time !== undefined) {
        var hours = Math.floor(time);
        var fractionalHour = time - hours;
        // Map to nearest 15 minute interval (0, 0.25, 0.5, 0.75)
        var minutes = 0;
        if (fractionalHour < 0.125) minutes = 0;else if (fractionalHour < 0.375) minutes = 15;else if (fractionalHour < 0.625) minutes = 30;else minutes = 45;
        newStart.setHours(hours, minutes, 0, 0);
      } else {
        // For month view, preserve the original time from currentTime
        newStart.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      }
      // Calculate new end time based on the original duration
      var originalStart = new Date(calendarEvent.start);
      var originalEnd = new Date(calendarEvent.end);
      var durationMinutes = differenceInMinutes(originalEnd, originalStart);
      var newEnd = addMinutes(newStart, durationMinutes);
      // Only update if the start time has actually changed
      var hasStartTimeChanged = originalStart.getFullYear() !== newStart.getFullYear() || originalStart.getMonth() !== newStart.getMonth() || originalStart.getDate() !== newStart.getDate() || originalStart.getHours() !== newStart.getHours() || originalStart.getMinutes() !== newStart.getMinutes();
      if (hasStartTimeChanged) {
        // Update the event only if the time has changed
        onEventUpdate(__assign(__assign({}, calendarEvent), {
          start: newStart,
          end: newEnd
        }));
      }
    } catch (error) {
      console.error("Error in drag end handler:", error);
    } finally {
      // Always reset state
      setActiveEvent(null);
      setActiveId(null);
      setActiveView(null);
      setCurrentTime(null);
      setEventHeight(null);
      setIsMultiDay(false);
      setMultiDayWidth(null);
      setDragHandlePosition(null);
    }
  };
  return jsx(DndContext, {
    id: dndContextId,
    sensors: sensors,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    children: jsxs(CalendarDndContext.Provider, {
      value: {
        activeEvent: activeEvent,
        activeId: activeId,
        activeView: activeView,
        currentTime: currentTime,
        eventHeight: eventHeight,
        isMultiDay: isMultiDay,
        multiDayWidth: multiDayWidth,
        dragHandlePosition: dragHandlePosition
      },
      children: [children, jsx(DragOverlay, {
        adjustScale: false,
        dropAnimation: null,
        children: activeEvent && activeView && jsx("div", {
          style: {
            height: eventHeight ? "".concat(eventHeight, "px") : "auto",
            width: isMultiDay && multiDayWidth ? "".concat(multiDayWidth, "%") : "100%"
            // Remove the transform that was causing the shift
          },
          children: jsx(EventItem, {
            event: activeEvent,
            view: activeView,
            isDragging: true,
            showTime: activeView !== "month",
            currentTime: currentTime || undefined,
            isFirstDay: ((_b = dragHandlePosition === null || dragHandlePosition === void 0 ? void 0 : dragHandlePosition.data) === null || _b === void 0 ? void 0 : _b.isFirstDay) !== false,
            isLastDay: ((_c = dragHandlePosition === null || dragHandlePosition === void 0 ? void 0 : dragHandlePosition.data) === null || _c === void 0 ? void 0 : _c.isLastDay) !== false
          })
        })
      })]
    })
  });
}

function DraggableEvent(_a) {
  var _b;
  var event = _a.event,
    view = _a.view,
    showTime = _a.showTime,
    onClick = _a.onClick,
    height = _a.height,
    isMultiDay = _a.isMultiDay,
    multiDayWidth = _a.multiDayWidth,
    _c = _a.isFirstDay,
    isFirstDay = _c === void 0 ? true : _c,
    _d = _a.isLastDay,
    isLastDay = _d === void 0 ? true : _d,
    ariaHidden = _a["aria-hidden"];
  var activeId = useCalendarDnd().activeId;
  var elementRef = useRef(null);
  var _e = useState(null),
    dragHandlePosition = _e[0],
    setDragHandlePosition = _e[1];
  // Check if this is a multi-day event
  var eventStart = new Date(event.start);
  var eventEnd = new Date(event.end);
  var isMultiDayEvent = isMultiDay || event.allDay || differenceInDays(eventEnd, eventStart) >= 1;
  var _f = useDraggable({
      id: "".concat(event.id, "-").concat(view),
      data: {
        event: event,
        view: view,
        height: height || ((_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || null,
        isMultiDay: isMultiDayEvent,
        multiDayWidth: multiDayWidth,
        dragHandlePosition: dragHandlePosition,
        isFirstDay: isFirstDay,
        isLastDay: isLastDay
      }
    }),
    attributes = _f.attributes,
    listeners = _f.listeners,
    setNodeRef = _f.setNodeRef,
    transform = _f.transform,
    isDragging = _f.isDragging;
  // Handle mouse down to track where on the event the user clicked
  var handleMouseDown = function (e) {
    if (elementRef.current) {
      var rect = elementRef.current.getBoundingClientRect();
      setDragHandlePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  // Don't render if this event is being dragged
  if (isDragging || activeId === "".concat(event.id, "-").concat(view)) {
    return jsx("div", {
      ref: setNodeRef,
      className: "opacity-0",
      style: {
        height: height || "auto"
      }
    });
  }
  var style = transform ? {
    transform: CSS.Translate.toString(transform),
    height: height || "auto",
    width: isMultiDayEvent && multiDayWidth ? "".concat(multiDayWidth, "%") : undefined
  } : {
    height: height || "auto",
    width: isMultiDayEvent && multiDayWidth ? "".concat(multiDayWidth, "%") : undefined
  };
  // Handle touch start to track where on the event the user touched
  var handleTouchStart = function (e) {
    if (elementRef.current) {
      var rect = elementRef.current.getBoundingClientRect();
      var touch = e.touches[0];
      if (touch) {
        setDragHandlePosition({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        });
      }
    }
  };
  return jsx("div", {
    ref: function (node) {
      setNodeRef(node);
      //@ts-ignore
      if (elementRef) elementRef.current = node;
    },
    style: style,
    className: "touch-none",
    children: jsx(EventItem, {
      event: event,
      view: view,
      showTime: showTime,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      dndListeners: listeners,
      dndAttributes: attributes,
      "aria-hidden": ariaHidden
    })
  });
}

function DroppableCell(_a) {
  var id = _a.id,
    date = _a.date,
    time = _a.time,
    children = _a.children,
    className = _a.className,
    onClick = _a.onClick;
  var activeEvent = useCalendarDnd().activeEvent;
  var _b = useDroppable({
      id: id,
      data: {
        date: date,
        time: time
      }
    }),
    setNodeRef = _b.setNodeRef,
    isOver = _b.isOver;
  // Format time for display in tooltip (only for debugging)
  var formattedTime = time !== undefined ? "".concat(Math.floor(time), ":").concat(Math.round((time - Math.floor(time)) * 60).toString().padStart(2, "0")) : null;
  return jsx("div", {
    ref: setNodeRef,
    onClick: onClick,
    className: cn("[&[data-dragging]]:bg-accent flex h-full flex-col overflow-hidden px-0.5 py-1 sm:px-1", className),
    title: formattedTime ? "".concat(formattedTime) : undefined,
    "data-dragging": isOver && activeEvent ? true : undefined,
    children: children
  });
}

function useCurrentTimeIndicator(currentDate, view) {
  var _a = useState(0),
    currentTimePosition = _a[0],
    setCurrentTimePosition = _a[1];
  var _b = useState(false),
    currentTimeVisible = _b[0],
    setCurrentTimeVisible = _b[1];
  useEffect(function () {
    var calculateTimePosition = function () {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var totalMinutes = (hours - StartHour) * 60 + minutes;
      var dayStartMinutes = 0; // 12am
      var dayEndMinutes = (EndHour - StartHour) * 60; // 12am next day
      // Calculate position as percentage of day
      var position = (totalMinutes - dayStartMinutes) / (dayEndMinutes - dayStartMinutes) * 100;
      // Check if current day is in view based on the calendar view
      var isCurrentTimeVisible = false;
      if (view === "day") {
        isCurrentTimeVisible = isSameDay(now, currentDate);
      } else if (view === "week") {
        var startOfWeekDate = startOfWeek(currentDate, {
          weekStartsOn: 0
        });
        var endOfWeekDate = endOfWeek(currentDate, {
          weekStartsOn: 0
        });
        isCurrentTimeVisible = isWithinInterval(now, {
          start: startOfWeekDate,
          end: endOfWeekDate
        });
      }
      setCurrentTimePosition(position);
      setCurrentTimeVisible(isCurrentTimeVisible);
    };
    // Calculate immediately
    calculateTimePosition();
    // Update every minute
    var interval = setInterval(calculateTimePosition, 60000);
    return function () {
      return clearInterval(interval);
    };
  }, [currentDate, view]);
  return {
    currentTimePosition: currentTimePosition,
    currentTimeVisible: currentTimeVisible
  };
}

function DayView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate;
  var hours = useMemo(function () {
    var dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1)
    });
  }, [currentDate]);
  var dayEvents = useMemo(function () {
    return events.filter(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      return isSameDay(currentDate, eventStart) || isSameDay(currentDate, eventEnd) || currentDate > eventStart && currentDate < eventEnd;
    }).sort(function (a, b) {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
  }, [currentDate, events]);
  // Filter all-day events
  var allDayEvents = useMemo(function () {
    return dayEvents.filter(function (event) {
      // Include explicitly marked all-day events or multi-day events
      return event.allDay || isMultiDayEvent(event);
    });
  }, [dayEvents]);
  // Get only single-day time-based events
  var timeEvents = useMemo(function () {
    return dayEvents.filter(function (event) {
      // Exclude all-day events and multi-day events
      return !event.allDay && !isMultiDayEvent(event);
    });
  }, [dayEvents]);
  // Process events to calculate positions
  var positionedEvents = useMemo(function () {
    var result = [];
    var dayStart = startOfDay(currentDate);
    // Sort events by start time and duration
    var sortedEvents = __spreadArray([], timeEvents, true).sort(function (a, b) {
      var aStart = new Date(a.start);
      var bStart = new Date(b.start);
      var aEnd = new Date(a.end);
      var bEnd = new Date(b.end);
      // First sort by start time
      if (aStart < bStart) return -1;
      if (aStart > bStart) return 1;
      // If start times are equal, sort by duration (longer events first)
      var aDuration = differenceInMinutes(aEnd, aStart);
      var bDuration = differenceInMinutes(bEnd, bStart);
      return bDuration - aDuration;
    });
    // Track columns for overlapping events
    var columns = [];
    sortedEvents.forEach(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      // Adjust start and end times if they're outside this day
      var adjustedStart = isSameDay(currentDate, eventStart) ? eventStart : dayStart;
      var adjustedEnd = isSameDay(currentDate, eventEnd) ? eventEnd : addHours(dayStart, 24);
      // Calculate top position and height
      var startHour = getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
      var endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
      var top = (startHour - StartHour) * WeekCellsHeight;
      var height = (endHour - startHour) * WeekCellsHeight;
      // Find a column for this event
      var columnIndex = 0;
      var placed = false;
      while (!placed) {
        var col = columns[columnIndex] || [];
        if (col.length === 0) {
          columns[columnIndex] = col;
          placed = true;
        } else {
          var overlaps = col.some(function (c) {
            return areIntervalsOverlapping({
              start: adjustedStart,
              end: adjustedEnd
            }, {
              start: new Date(c.event.start),
              end: new Date(c.event.end)
            });
          });
          if (!overlaps) {
            placed = true;
          } else {
            columnIndex++;
          }
        }
      }
      // Ensure column is initialized before pushing
      var currentColumn = columns[columnIndex] || [];
      columns[columnIndex] = currentColumn;
      currentColumn.push({
        event: event,
        end: adjustedEnd
      });
      // First column takes full width, others are indented by 10% and take 90% width
      var width = columnIndex === 0 ? 1 : 1 - columnIndex * 0.1;
      var left = columnIndex === 0 ? 0 : columnIndex * 0.1;
      result.push({
        event: event,
        top: top,
        height: height,
        left: left,
        width: width,
        zIndex: 10 + columnIndex // Higher columns get higher z-index
      });
    });
    return result;
  }, [currentDate, timeEvents]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var showAllDaySection = allDayEvents.length > 0;
  var _b = useCurrentTimeIndicator(currentDate, "day"),
    currentTimePosition = _b.currentTimePosition,
    currentTimeVisible = _b.currentTimeVisible;
  return jsxs("div", {
    "data-slot": "day-view",
    className: "contents",
    children: [showAllDaySection && jsx("div", {
      className: "border-border/70 bg-muted/50 border-t",
      children: jsxs("div", {
        className: "grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr]",
        children: [jsx("div", {
          className: "relative",
          children: jsx("span", {
            className: "text-muted-foreground/70 absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] sm:pe-4 sm:text-xs",
            children: "All day"
          })
        }), jsx("div", {
          className: "border-border/70 relative border-r p-1 last:border-r-0",
          children: allDayEvents.map(function (event) {
            var eventStart = new Date(event.start);
            var eventEnd = new Date(event.end);
            var isFirstDay = isSameDay(currentDate, eventStart);
            var isLastDay = isSameDay(currentDate, eventEnd);
            return jsx(EventItem, {
              onClick: function (e) {
                return handleEventClick(event, e);
              },
              event: event,
              view: "month",
              isFirstDay: isFirstDay,
              isLastDay: isLastDay,
              children: jsx("div", {
                children: event.title
              })
            }, "spanning-".concat(event.id));
          })
        })]
      })
    }), jsxs("div", {
      className: "border-border/70 grid flex-1 grid-cols-[3rem_1fr] overflow-hidden border-t sm:grid-cols-[4rem_1fr]",
      children: [jsx("div", {
        children: hours.map(function (hour, index) {
          return jsx("div", {
            className: "border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0",
            children: index > 0 && jsx("span", {
              className: "bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs",
              children: format(hour, "h a")
            })
          }, hour.toString());
        })
      }), jsxs("div", {
        className: "relative",
        children: [positionedEvents.map(function (positionedEvent) {
          return jsx("div", {
            className: "absolute z-10 px-0.5",
            style: {
              top: "".concat(positionedEvent.top, "px"),
              height: "".concat(positionedEvent.height, "px"),
              left: "".concat(positionedEvent.left * 100, "%"),
              width: "".concat(positionedEvent.width * 100, "%"),
              zIndex: positionedEvent.zIndex
            },
            children: jsx("div", {
              className: "h-full w-full",
              children: jsx(DraggableEvent, {
                event: positionedEvent.event,
                view: "day",
                onClick: function (e) {
                  return handleEventClick(positionedEvent.event, e);
                },
                showTime: true,
                height: positionedEvent.height
              })
            })
          }, positionedEvent.event.id);
        }), currentTimeVisible && jsx("div", {
          className: "pointer-events-none absolute right-0 left-0 z-20",
          style: {
            top: "".concat(currentTimePosition, "%")
          },
          children: jsxs("div", {
            className: "relative flex items-center",
            children: [jsx("div", {
              className: "bg-primary absolute -left-1 h-2 w-2 rounded-full"
            }), jsx("div", {
              className: "bg-primary h-[2px] w-full"
            })]
          })
        }), hours.map(function (hour) {
          var hourValue = getHours(hour);
          return jsx("div", {
            className: "border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0",
            children: [0, 1, 2, 3].map(function (quarter) {
              var quarterHourTime = hourValue + quarter * 0.25;
              return jsx(DroppableCell, {
                id: "day-cell-".concat(currentDate.toISOString(), "-").concat(quarterHourTime),
                date: currentDate,
                time: quarterHourTime,
                className: cn("absolute h-[calc(var(--week-cells-height)/4)] w-full", quarter === 0 && "top-0", quarter === 1 && "top-[calc(var(--week-cells-height)/4)]", quarter === 2 && "top-[calc(var(--week-cells-height)/4*2)]", quarter === 3 && "top-[calc(var(--week-cells-height)/4*3)]"),
                onClick: function () {
                  var startTime = new Date(currentDate);
                  startTime.setHours(hourValue);
                  startTime.setMinutes(quarter * 15);
                  onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                }
              }, "".concat(hour.toString(), "-").concat(quarter));
            })
          }, hour.toString());
        })]
      })]
    })]
  });
}

/**
 * Hook for calculating event visibility based on container height
 * Uses ResizeObserver for efficient updates
 */
function useEventVisibility(_a) {
  var eventHeight = _a.eventHeight,
    eventGap = _a.eventGap;
  // Use the standard pattern for React refs
  var contentRef = useRef(null);
  var observerRef = useRef(null);
  var _b = useState(null),
    contentHeight = _b[0],
    setContentHeight = _b[1];
  // Use layout effect for synchronous measurement before paint
  useLayoutEffect(function () {
    if (!contentRef.current) return;
    // Function to update the content height
    var updateHeight = function () {
      if (contentRef.current) {
        setContentHeight(contentRef.current.clientHeight);
      }
    };
    // Initial measurement (synchronous)
    updateHeight();
    // Create observer only once and reuse it
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(function () {
        // Just call updateHeight when resize is detected
        updateHeight();
      });
    }
    // Start observing the content container
    observerRef.current.observe(contentRef.current);
    // Clean up function
    return function () {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  // Function to calculate visible events for a cell
  var getVisibleEventCount = useMemo(function () {
    return function (totalEvents) {
      if (!contentHeight) return totalEvents;
      // Calculate how many events can fit in the container
      var maxEvents = Math.floor(contentHeight / (eventHeight + eventGap));
      // If all events fit, show them all
      if (totalEvents <= maxEvents) {
        return totalEvents;
      } else {
        // Otherwise, reserve space for "more" button by showing one less
        return maxEvents > 0 ? maxEvents - 1 : 0;
      }
    };
  }, [contentHeight, eventHeight, eventGap]);
  // Use type assertion to satisfy TypeScript
  return {
    contentRef: contentRef,
    contentHeight: contentHeight,
    getVisibleEventCount: getVisibleEventCount
  };
}

function Popover(_a) {
  var props = __rest(_a, []);
  return jsx(PopoverPrimitive.Root, __assign({
    "data-slot": "popover"
  }, props));
}
function PopoverTrigger(_a) {
  var props = __rest(_a, []);
  return jsx(PopoverPrimitive.Trigger, __assign({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent(_a) {
  var className = _a.className,
    _b = _a.align,
    align = _b === void 0 ? "center" : _b,
    _c = _a.sideOffset,
    sideOffset = _c === void 0 ? 4 : _c,
    _d = _a.showArrow,
    showArrow = _d === void 0 ? false : _d,
    props = __rest(_a, ["className", "align", "sideOffset", "showArrow"]);
  return jsx(PopoverPrimitive.Portal, {
    children: jsxs(PopoverPrimitive.Content, __assign({
      "data-slot": "popover-content",
      align: align,
      sideOffset: sideOffset,
      className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden", className)
    }, props, {
      children: [props.children, showArrow && jsx(PopoverPrimitive.Arrow, {
        className: "fill-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
      })]
    }))
  });
}

function MonthView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate,
    _b = _a.eventHeight,
    eventHeight = _b === void 0 ? EventHeight : _b,
    _c = _a.eventGap,
    eventGap = _c === void 0 ? EventGap : _c,
    showNewEventButton = _a.showNewEventButton;
  var days = useMemo(function () {
    var monthStart = startOfMonth(currentDate);
    var monthEnd = endOfMonth(monthStart);
    var calendarStart = startOfWeek(monthStart, {
      weekStartsOn: 0
    });
    var calendarEnd = endOfWeek(monthEnd, {
      weekStartsOn: 0
    });
    return eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    });
  }, [currentDate]);
  var weekdays = useMemo(function () {
    return Array.from({
      length: 7
    }).map(function (_, i) {
      var date = addDays(startOfWeek(new Date()), i);
      return format(date, "EEE");
    });
  }, []);
  var weeks = useMemo(function () {
    var result = [];
    var week = [];
    for (var i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        result.push(week);
        week = [];
      }
    }
    return result;
  }, [days]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var _d = useState(false),
    isMounted = _d[0],
    setIsMounted = _d[1];
  var _e = useEventVisibility({
      eventHeight: eventHeight,
      eventGap: eventGap
    }),
    contentRef = _e.contentRef,
    getVisibleEventCount = _e.getVisibleEventCount;
  useEffect(function () {
    setIsMounted(true);
  }, []);
  return jsxs("div", {
    "data-slot": "month-view",
    className: "contents",
    children: [jsx("div", {
      className: "border-border/70 grid grid-cols-7 border-b",
      children: weekdays.map(function (day) {
        return jsx("div", {
          className: "text-muted-foreground/70 py-2 text-center text-sm",
          children: day
        }, day);
      })
    }), jsx("div", {
      className: "grid flex-1 auto-rows-fr",
      children: weeks.map(function (week, weekIndex) {
        return jsx("div", {
          className: "grid grid-cols-7 [&:last-child>*]:border-b-0",
          children: week.map(function (day, dayIndex) {
            if (!day) return null; // Skip if day is undefined
            var dayEvents = getEventsForDay(events, day);
            var spanningEvents = getSpanningEventsForDay(events, day);
            var isCurrentMonth = isSameMonth(day, currentDate);
            var cellId = "month-cell-".concat(day.toISOString());
            var allDayEvents = __spreadArray(__spreadArray([], spanningEvents, true), dayEvents, true);
            var allEvents = getAllEventsForDay(events, day);
            var isReferenceCell = weekIndex === 0 && dayIndex === 0;
            var visibleCount = isMounted ? getVisibleEventCount(allDayEvents.length) : undefined;
            var hasMore = visibleCount !== undefined && allDayEvents.length > visibleCount;
            var remainingCount = hasMore ? allDayEvents.length - visibleCount : 0;
            return jsx("div", {
              className: "group [&[data-outside-cell]]:bg-sidebar data-outside-cell:bg-opacity-25 data-outside-cell:text-muted-foreground border-r border-b last:border-r-0",
              "data-today": isToday(day) || undefined,
              "data-outside-cell": !isCurrentMonth || undefined,
              children: jsxs(DroppableCell, {
                id: cellId,
                date: day,
                onClick: function () {
                  if (showNewEventButton) {
                    var startTime = new Date(day);
                    startTime.setHours(DefaultStartHour, 0, 0);
                    onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                  }
                },
                children: [jsx("div", {
                  "data-today": isToday(day) || undefined,
                  className: "[&[data-today]]:bg-primary [&[data-today]]:text-primary-foreground mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm",
                  children: format(day, "d")
                }), jsxs("div", {
                  ref: isReferenceCell ? contentRef : null,
                  className: "min-h-[calc((var(--event-height)+var(--event-gap))*2)] sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)]",
                  children: [sortEvents(allDayEvents).map(function (event, index) {
                    var eventStart = new Date(event.start);
                    var eventEnd = new Date(event.end);
                    var isFirstDay = isSameDay(day, eventStart);
                    var isLastDay = isSameDay(day, eventEnd);
                    var isHidden = isMounted && visibleCount && index >= visibleCount;
                    if (!visibleCount) return null;
                    if (!isFirstDay) {
                      return jsx("div", {
                        className: "aria-hidden:hidden",
                        "aria-hidden": isHidden ? "true" : undefined,
                        children: jsx(EventItem, {
                          onClick: function (e) {
                            return handleEventClick(event, e);
                          },
                          event: event,
                          view: "month",
                          isFirstDay: isFirstDay,
                          isLastDay: isLastDay,
                          children: jsxs("div", {
                            className: "invisible",
                            "aria-hidden": true,
                            children: [!event.allDay && jsxs("span", {
                              children: [format(new Date(event.start), "h:mm"), " "]
                            }), event.title]
                          })
                        })
                      }, "spanning-".concat(event.id, "-").concat(day.toISOString().slice(0, 10)));
                    }
                    return jsx("div", {
                      className: "aria-hidden:hidden",
                      "aria-hidden": isHidden ? "true" : undefined,
                      children: jsx(DraggableEvent, {
                        event: event,
                        view: "month",
                        onClick: function (e) {
                          return handleEventClick(event, e);
                        },
                        isFirstDay: isFirstDay,
                        isLastDay: isLastDay
                      })
                    }, event.id);
                  }), hasMore && jsxs(Popover, {
                    modal: true,
                    children: [jsx(PopoverTrigger, {
                      asChild: true,
                      children: jsx("button", {
                        className: "focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-[var(--event-gap)] flex h-[var(--event-height)] w-full items-center overflow-hidden px-1 text-left text-[10px] backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] sm:px-2 sm:text-xs",
                        onClick: function (e) {
                          return e.stopPropagation();
                        },
                        children: jsxs("span", {
                          children: ["+ ", remainingCount, " ", jsx("span", {
                            className: "max-sm:sr-only",
                            children: "more"
                          })]
                        })
                      })
                    }), jsx(PopoverContent, {
                      align: "center",
                      className: "max-w-52 p-3",
                      style: {
                        "--event-height": "".concat(eventHeight, "px")
                      },
                      children: jsxs("div", {
                        className: "space-y-2",
                        children: [jsx("div", {
                          className: "text-sm font-medium",
                          children: format(day, "EEE d")
                        }), jsx("div", {
                          className: "space-y-1",
                          children: sortEvents(allEvents).map(function (event) {
                            var eventStart = new Date(event.start);
                            var eventEnd = new Date(event.end);
                            var isFirstDay = isSameDay(day, eventStart);
                            var isLastDay = isSameDay(day, eventEnd);
                            return jsx(EventItem, {
                              onClick: function (e) {
                                return handleEventClick(event, e);
                              },
                              event: event,
                              view: "month",
                              isFirstDay: isFirstDay,
                              isLastDay: isLastDay
                            }, event.id);
                          })
                        })]
                      })
                    })]
                  })]
                })]
              })
            }, day.toString());
          })
        }, "week-".concat(weekIndex));
      })
    })]
  });
}

var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
      outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-3 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button(_a) {
  var className = _a.className,
    variant = _a.variant,
    size = _a.size,
    _b = _a.asChild,
    asChild = _b === void 0 ? false : _b,
    props = __rest(_a, ["className", "variant", "size", "asChild"]);
  var Comp = asChild ? Slot : "button";
  return jsx(Comp, __assign({
    "data-slot": "button",
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    }))
  }, props));
}

function DropdownMenu(_a) {
  var props = __rest(_a, []);
  return jsx(DropdownMenuPrimitive.Root, __assign({
    "data-slot": "dropdown-menu"
  }, props));
}
function DropdownMenuTrigger(_a) {
  var props = __rest(_a, []);
  return jsx(DropdownMenuPrimitive.Trigger, __assign({
    "data-slot": "dropdown-menu-trigger"
  }, props));
}
function DropdownMenuContent(_a) {
  var className = _a.className,
    _b = _a.sideOffset,
    sideOffset = _b === void 0 ? 4 : _b,
    onPointerDown = _a.onPointerDown,
    onPointerDownOutside = _a.onPointerDownOutside,
    onCloseAutoFocus = _a.onCloseAutoFocus,
    props = __rest(_a, ["className", "sideOffset", "onPointerDown", "onPointerDownOutside", "onCloseAutoFocus"]);
  var isCloseFromMouse = React.useRef(false);
  var handlePointerDown = React.useCallback(function (e) {
    isCloseFromMouse.current = true;
    onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown(e);
  }, [onPointerDown]);
  var handlePointerDownOutside = React.useCallback(function (e) {
    isCloseFromMouse.current = true;
    onPointerDownOutside === null || onPointerDownOutside === void 0 ? void 0 : onPointerDownOutside(e);
  }, [onPointerDownOutside]);
  var handleCloseAutoFocus = React.useCallback(function (e) {
    if (onCloseAutoFocus) {
      return onCloseAutoFocus(e);
    }
    if (!isCloseFromMouse.current) {
      return;
    }
    e.preventDefault();
    isCloseFromMouse.current = false;
  }, [onCloseAutoFocus]);
  return jsx(DropdownMenuPrimitive.Portal, {
    children: jsx(DropdownMenuPrimitive.Content, __assign({
      "data-slot": "dropdown-menu-content",
      sideOffset: sideOffset,
      className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-lg", className),
      onPointerDown: handlePointerDown,
      onPointerDownOutside: handlePointerDownOutside,
      onCloseAutoFocus: handleCloseAutoFocus
    }, props))
  });
}
function DropdownMenuItem(_a) {
  var className = _a.className,
    inset = _a.inset,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    props = __rest(_a, ["className", "inset", "variant"]);
  return jsx(DropdownMenuPrimitive.Item, __assign({
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)
  }, props));
}
function DropdownMenuShortcut(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx("kbd", __assign({
    "data-slot": "dropdown-menu-shortcut",
    className: cn("bg-background text-muted-foreground/70 ms-auto -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium", className)
  }, props));
}

function WeekView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate;
  var days = useMemo(function () {
    var weekStart = startOfWeek(currentDate, {
      weekStartsOn: 0
    });
    var weekEnd = endOfWeek(currentDate, {
      weekStartsOn: 0
    });
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd
    });
  }, [currentDate]);
  var weekStart = useMemo(function () {
    return startOfWeek(currentDate, {
      weekStartsOn: 0
    });
  }, [currentDate]);
  var hours = useMemo(function () {
    var dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1)
    });
  }, [currentDate]);
  // Get all-day events and multi-day events for the week
  var allDayEvents = useMemo(function () {
    return events.filter(function (event) {
      // Include explicitly marked all-day events or multi-day events
      return event.allDay || isMultiDayEvent(event);
    }).filter(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      return days.some(function (day) {
        return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
      });
    });
  }, [events, days]);
  // Process events for each day to calculate positions
  var processedDayEvents = useMemo(function () {
    var result = days.map(function (day) {
      // Get events for this day that are not all-day events or multi-day events
      var dayEvents = events.filter(function (event) {
        // Skip all-day events and multi-day events
        if (event.allDay || isMultiDayEvent(event)) return false;
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        // Check if event is on this day
        return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || eventStart < day && eventEnd > day;
      });
      // Sort events by start time and duration
      var sortedEvents = __spreadArray([], dayEvents, true).sort(function (a, b) {
        var aStart = new Date(a.start);
        var bStart = new Date(b.start);
        var aEnd = new Date(a.end);
        var bEnd = new Date(b.end);
        // First sort by start time
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;
        // If start times are equal, sort by duration (longer events first)
        var aDuration = differenceInMinutes(aEnd, aStart);
        var bDuration = differenceInMinutes(bEnd, bStart);
        return bDuration - aDuration;
      });
      // Calculate positions for each event
      var positionedEvents = [];
      var dayStart = startOfDay(day);
      // Track columns for overlapping events
      var columns = [];
      sortedEvents.forEach(function (event) {
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        // Adjust start and end times if they're outside this day
        var adjustedStart = isSameDay(day, eventStart) ? eventStart : dayStart;
        var adjustedEnd = isSameDay(day, eventEnd) ? eventEnd : addHours(dayStart, 24);
        // Calculate top position and height
        var startHour = getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
        var endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
        // Adjust the top calculation to account for the new start time
        var top = (startHour - StartHour) * WeekCellsHeight;
        var height = (endHour - startHour) * WeekCellsHeight;
        // Find a column for this event
        var columnIndex = 0;
        var placed = false;
        while (!placed) {
          var col = columns[columnIndex] || [];
          if (col.length === 0) {
            columns[columnIndex] = col;
            placed = true;
          } else {
            var overlaps = col.some(function (c) {
              return areIntervalsOverlapping({
                start: adjustedStart,
                end: adjustedEnd
              }, {
                start: new Date(c.event.start),
                end: new Date(c.event.end)
              });
            });
            if (!overlaps) {
              placed = true;
            } else {
              columnIndex++;
            }
          }
        }
        // Ensure column is initialized before pushing
        var currentColumn = columns[columnIndex] || [];
        columns[columnIndex] = currentColumn;
        currentColumn.push({
          event: event,
          end: adjustedEnd
        });
        // Calculate width and left position based on number of columns
        var width = columnIndex === 0 ? 1 : 1 - columnIndex * 0.1;
        var left = columnIndex === 0 ? 0 : columnIndex * 0.1;
        positionedEvents.push({
          event: event,
          top: top,
          height: height,
          left: left,
          width: width,
          zIndex: 10 + columnIndex // Higher columns get higher z-index
        });
      });
      return positionedEvents;
    });
    return result;
  }, [days, events]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var showAllDaySection = allDayEvents.length > 0;
  var _b = useCurrentTimeIndicator(currentDate, "week"),
    currentTimePosition = _b.currentTimePosition,
    currentTimeVisible = _b.currentTimeVisible;
  return jsxs("div", {
    "data-slot": "week-view",
    className: "flex h-full flex-col",
    children: [jsxs("div", {
      className: "bg-background/80 border-border/70 sticky top-0 z-30 grid grid-cols-8 border-b backdrop-blur-md",
      children: [jsx("div", {
        className: "text-muted-foreground/70 py-2 text-center text-sm",
        children: jsx("span", {
          className: "max-[479px]:sr-only",
          children: format(new Date(), "O")
        })
      }), days.map(function (day) {
        return jsxs("div", {
          className: "data-today:text-foreground text-muted-foreground/70 py-2 text-center text-sm data-today:font-medium",
          "data-today": isToday(day) || undefined,
          children: [jsxs("span", {
            className: "sm:hidden",
            "aria-hidden": "true",
            children: [format(day, "E")[0], " ", format(day, "d")]
          }), jsx("span", {
            className: "max-sm:hidden",
            children: format(day, "EEE dd")
          })]
        }, day.toString());
      })]
    }), showAllDaySection && jsx("div", {
      className: "border-border/70 bg-muted/50 border-b",
      children: jsxs("div", {
        className: "grid grid-cols-8",
        children: [jsx("div", {
          className: "border-border/70 relative border-r",
          children: jsx("span", {
            className: "text-muted-foreground/70 absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] sm:pe-4 sm:text-xs",
            children: "All day"
          })
        }), days.map(function (day, dayIndex) {
          var dayAllDayEvents = allDayEvents.filter(function (event) {
            var eventStart = new Date(event.start);
            var eventEnd = new Date(event.end);
            return isSameDay(day, eventStart) || day > eventStart && day < eventEnd || isSameDay(day, eventEnd);
          });
          return jsx("div", {
            className: "border-border/70 relative border-r p-1 last:border-r-0",
            "data-today": isToday(day) || undefined,
            children: dayAllDayEvents.map(function (event) {
              var eventStart = new Date(event.start);
              var eventEnd = new Date(event.end);
              var isFirstDay = isSameDay(day, eventStart);
              var isLastDay = isSameDay(day, eventEnd);
              // Check if this is the first day in the current week view
              var isFirstVisibleDay = dayIndex === 0 && isBefore(eventStart, weekStart);
              var shouldShowTitle = isFirstDay || isFirstVisibleDay;
              return jsx(EventItem, {
                onClick: function (e) {
                  return handleEventClick(event, e);
                },
                event: event,
                view: "month",
                isFirstDay: isFirstDay,
                isLastDay: isLastDay,
                children: jsx("div", {
                  className: cn("truncate", !shouldShowTitle && "invisible"),
                  "aria-hidden": !shouldShowTitle,
                  children: event.title
                })
              }, "spanning-".concat(event.id));
            })
          }, day.toString());
        })]
      })
    }), jsxs("div", {
      className: "grid flex-1 grid-cols-8 overflow-hidden",
      children: [jsx("div", {
        className: "border-border/70 grid auto-cols-fr border-r",
        children: hours.map(function (hour, index) {
          return jsx("div", {
            className: "border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0",
            children: index > 0 && jsx("span", {
              className: "bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs",
              children: format(hour, "h a")
            })
          }, hour.toString());
        })
      }), days.map(function (day, dayIndex) {
        var _a;
        return jsxs("div", {
          className: "border-border/70 relative grid auto-cols-fr border-r last:border-r-0",
          "data-today": isToday(day) || undefined,
          children: [((_a = processedDayEvents[dayIndex]) !== null && _a !== void 0 ? _a : []).map(function (positionedEvent) {
            return jsx("div", {
              className: "absolute z-10 px-0.5",
              style: {
                top: "".concat(positionedEvent.top, "px"),
                height: "".concat(positionedEvent.height, "px"),
                left: "".concat(positionedEvent.left * 100, "%"),
                width: "".concat(positionedEvent.width * 100, "%"),
                zIndex: positionedEvent.zIndex
              },
              onClick: function (e) {
                return e.stopPropagation();
              },
              children: jsx("div", {
                className: "h-full w-full",
                children: jsx(DraggableEvent, {
                  event: positionedEvent.event,
                  view: "week",
                  onClick: function (e) {
                    return handleEventClick(positionedEvent.event, e);
                  },
                  showTime: true,
                  height: positionedEvent.height
                })
              })
            }, positionedEvent.event.id);
          }), currentTimeVisible && isToday(day) && jsx("div", {
            className: "pointer-events-none absolute right-0 left-0 z-20",
            style: {
              top: "".concat(currentTimePosition, "%")
            },
            children: jsxs("div", {
              className: "relative flex items-center",
              children: [jsx("div", {
                className: "bg-primary absolute -left-1 h-2 w-2 rounded-full"
              }), jsx("div", {
                className: "bg-primary h-[2px] w-full"
              })]
            })
          }), hours.map(function (hour) {
            var hourValue = getHours(hour);
            return jsx("div", {
              className: "border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0",
              children: [0, 1, 2, 3].map(function (quarter) {
                var quarterHourTime = hourValue + quarter * 0.25;
                return jsx(DroppableCell, {
                  id: "week-cell-".concat(day.toISOString(), "-").concat(quarterHourTime),
                  date: day,
                  time: quarterHourTime,
                  className: cn("absolute h-[calc(var(--week-cells-height)/4)] w-full", quarter === 0 && "top-0", quarter === 1 && "top-[calc(var(--week-cells-height)/4)]", quarter === 2 && "top-[calc(var(--week-cells-height)/4*2)]", quarter === 3 && "top-[calc(var(--week-cells-height)/4*3)]"),
                  onClick: function () {
                    var startTime = new Date(day);
                    startTime.setHours(hourValue);
                    startTime.setMinutes(quarter * 15);
                    onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                  }
                }, "".concat(hour.toString(), "-").concat(quarter));
              })
            }, hour.toString());
          })]
        }, day.toString());
      })]
    })]
  });
}

function EventCalendar(_a) {
  var _b = _a.events,
    events = _b === void 0 ? [] : _b;
    _a.onEventAdd;
    var onEventUpdate = _a.onEventUpdate;
    _a.onEventDelete;
    var className = _a.className,
    _c = _a.initialView,
    initialView = _c === void 0 ? "month" : _c,
    onEventCreate = _a.onEventCreate,
    onEventSelect = _a.onEventSelect,
    showViewSwitcher = _a.showViewSwitcher,
    showNewEventButton = _a.showNewEventButton,
    _d = _a.eventHeight,
    eventHeight = _d === void 0 ? EventHeight : _d,
    _e = _a.eventGap,
    eventGap = _e === void 0 ? EventGap : _e,
    _f = _a.weekCellsHeight,
    weekCellsHeight = _f === void 0 ? WeekCellsHeight : _f;
    _a.agendaDaysToShow;
  var _h = useState(new Date()),
    currentDate = _h[0],
    setCurrentDate = _h[1];
  var _j = useState(initialView),
    view = _j[0],
    setView = _j[1];
  // const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  // const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  // Add keyboard shortcuts for view switching
  useEffect(function () {
    var handleKeyDown = function (e) {
      // Skip if user is typing in an input, textarea or contentEditable element
      // or if the event dialog is open
      if (
      // isEventDialogOpen ||
      !showViewSwitcher || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.isContentEditable) {
        return;
      }
      switch (e.key.toLowerCase()) {
        case "m":
          setView("month");
          break;
        case "w":
          setView("week");
          break;
        case "d":
          setView("day");
          break;
        case "a":
          setView("agenda");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [/* isEventDialogOpen */
  showViewSwitcher]);
  var handlePrevious = function () {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "agenda") {
      // For agenda view, go back 30 days (a full month)
      setCurrentDate(addDays(currentDate, -30));
    }
  };
  var handleNext = function () {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "agenda") {
      // For agenda view, go forward 30 days (a full month)
      setCurrentDate(addDays(currentDate, AgendaDaysToShow));
    }
  };
  var handleToday = function () {
    setCurrentDate(new Date());
  };
  var handleEventUpdate = function (updatedEvent) {
    onEventUpdate === null || onEventUpdate === void 0 ? void 0 : onEventUpdate(updatedEvent);
    // // Show toast notification when an event is updated via drag and drop
    // toast(`Event "${updatedEvent.title}" moved`, {
    //   description: format(new Date(updatedEvent.start), "MMM d, yyyy"),
    //   position: "bottom-left",rest
    // })
  };
  var viewTitle = useMemo(function () {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (view === "week") {
      var start = startOfWeek(currentDate, {
        weekStartsOn: 0
      });
      var end = endOfWeek(currentDate, {
        weekStartsOn: 0
      });
      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      } else {
        return "".concat(format(start, "MMM"), " - ").concat(format(end, "MMM yyyy"));
      }
    } else if (view === "day") {
      return jsxs(Fragment, {
        children: [jsx("span", {
          className: "min-[480px]:hidden",
          "aria-hidden": "true",
          children: format(currentDate, "MMM d, yyyy")
        }), jsx("span", {
          className: "max-[479px]:hidden min-md:hidden",
          "aria-hidden": "true",
          children: format(currentDate, "MMMM d, yyyy")
        }), jsx("span", {
          className: "max-md:hidden",
          children: format(currentDate, "EEE MMMM d, yyyy")
        })]
      });
    } else if (view === "agenda") {
      // Show the month range for agenda view
      var start = currentDate;
      var end = addDays(currentDate, AgendaDaysToShow - 1);
      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      } else {
        return "".concat(format(start, "MMM"), " - ").concat(format(end, "MMM yyyy"));
      }
    } else {
      return format(currentDate, "MMMM yyyy");
    }
  }, [currentDate, view]);
  return jsx("div", {
    className: "flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1",
    style: {
      "--event-height": "".concat(eventHeight, "px"),
      "--event-gap": "".concat(eventGap, "px"),
      "--week-cells-height": "".concat(weekCellsHeight, "px")
    },
    "data-height": eventHeight,
    children: jsxs(CalendarDndProvider, {
      onEventUpdate: handleEventUpdate,
      children: [jsxs("div", {
        className: cn("flex items-center justify-between p-2 sm:p-4", className),
        children: [jsxs("div", {
          className: "flex items-center gap-1 sm:gap-4",
          children: [jsxs(Button, {
            variant: "outline",
            className: "aspect-square max-[479px]:p-0!",
            onClick: handleToday,
            children: [jsx(RiCalendarCheckLine, {
              className: "min-[480px]:hidden",
              size: 16,
              "aria-hidden": "true"
            }), jsx("span", {
              className: "max-[479px]:sr-only",
              children: "Today"
            })]
          }), jsxs("div", {
            className: "flex items-center sm:gap-2",
            children: [jsx(Button, {
              variant: "ghost",
              size: "icon",
              onClick: handlePrevious,
              "aria-label": "Previous",
              children: jsx(ChevronLeftIcon, {
                size: 16,
                "aria-hidden": "true"
              })
            }), jsx(Button, {
              variant: "ghost",
              size: "icon",
              onClick: handleNext,
              "aria-label": "Next",
              children: jsx(ChevronRightIcon, {
                size: 16,
                "aria-hidden": "true"
              })
            })]
          }), jsx("h2", {
            className: "text-sm font-semibold sm:text-lg md:text-xl",
            children: viewTitle
          })]
        }), jsxs("div", {
          className: "flex items-center gap-2",
          children: [showViewSwitcher && jsxs(DropdownMenu, {
            children: [jsx(DropdownMenuTrigger, {
              children: jsx(Button, {
                variant: "outline",
                className: "gap-1.5 max-[479px]:h-8",
                asChild: true,
                children: jsxs("div", {
                  children: [jsxs("span", {
                    children: [jsx("span", {
                      className: "visible sm:invisible",
                      "aria-hidden": "true",
                      children: view.charAt(0).toUpperCase()
                    }), jsx("span", {
                      className: "invisible sm:visible",
                      children: view.charAt(0).toUpperCase() + view.slice(1)
                    })]
                  }), jsx(ChevronDownIcon, {
                    className: "-me-1 opacity-60",
                    size: 16,
                    "aria-hidden": "true"
                  })]
                })
              })
            }), jsxs(DropdownMenuContent, {
              align: "end",
              className: "min-w-32",
              children: [jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("month");
                },
                children: ["Month ", jsx(DropdownMenuShortcut, {
                  children: "M"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("week");
                },
                children: ["Week ", jsx(DropdownMenuShortcut, {
                  children: "W"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("day");
                },
                children: ["Day ", jsx(DropdownMenuShortcut, {
                  children: "D"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("agenda");
                },
                children: ["Agenda ", jsx(DropdownMenuShortcut, {
                  children: "A"
                })]
              })]
            })]
          }), showNewEventButton && jsxs(Button, {
            className: "aspect-square max-[479px]:p-0!",
            onClick: function () {
              var startTime = new Date(currentDate);
              startTime.setHours(0, 0, 0, 0);
              onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
            },
            children: [jsx(PlusIcon, {
              className: "opacity-60 sm:-ms-1",
              size: 16,
              "aria-hidden": "true"
            }), jsx("span", {
              className: "max-sm:sr-only",
              children: "New event"
            })]
          })]
        })]
      }), jsxs("div", {
        className: "flex flex-1 flex-col",
        children: [view === "month" && jsx(MonthView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate,
          eventGap: eventGap,
          eventHeight: eventHeight,
          showNewEventButton: showNewEventButton
        }), view === "week" && jsx(WeekView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate
        }), view === "day" && jsx(DayView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate
        }), view === "agenda" && jsx(AgendaView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect
        })]
      })]
    })
  });
}

export { AgendaDaysToShow, AgendaView, CalendarDndProvider, DayView, DefaultEndHour, DefaultStartHour, DraggableEvent, DroppableCell, EndHour, EventCalendar, EventGap, EventHeight, EventItem, MonthView, StartHour, WeekCellsHeight, WeekView, getAgendaEventsForDay, getAllEventsForDay, getBorderRadiusClasses, getEventColorClasses, getEventsForDay, getSpanningEventsForDay, isMultiDayEvent, sortEvents, useCalendarDnd, useCurrentTimeIndicator, useEventVisibility };
//# sourceMappingURL=index.esm.js.map
