# React Calendar

**Forked from:** [OriginSpace/EventCalendar](https://github.com/origin-space/event-calendar.git)

## Installation

To use `react-calendar` from this specific GitHub repository and ensure its styles work correctly with Tailwind CSS v3, follow these steps:

1.  **Install the package from GitHub:**

    Open your terminal and run one of the following commands depending on your package manager:

    **npm:**
    ```bash
    npm install https://github.com/currents-ai/react-calendar.git
    ```

    **yarn:**
    ```bash
    yarn add https://github.com/currents-ai/react-calendar.git
    ```

    **pnpm:**
    ```bash
    pnpm add https://github.com/currents-ai/react-calendar.git
    ```
    This will download the package from the GitHub repository and place it in your `node_modules` directory. It's expected that the package will be named `@currents/calendar` (based on its `package.json`), which is important for the Tailwind configuration and import statements below.

2.  **Configure Tailwind CSS Content:**

    For Tailwind CSS to recognize and generate the necessary utility classes used by `react-calendar`, you must add the path to its distributed JavaScript file to the `content` array in your `tailwind.config.js` (or `.ts`) file.

    ```javascript
    // tailwind.config.js
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Your existing content paths for your application
        "./node_modules/@currents/calendar/dist/index.js", // Add this line for react-calendar
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

3.  **Import and Use:**

    Once installed and Tailwind is configured, you can import and use the component in your React application as shown in the "Original Usage" section:

    ```jsx
    import { EventCalendar, type CalendarEvent } from "@currents/calendar"; 

    function App() {
      // ... your component logic from the "Original Usage" example
      return <EventCalendar events={[]} />;
    }
    ```

## Original Usage

```jsx
import { EventCalendar, type CalendarEvent } from "@currents/calendar"; // Path might change post-refactor

function App() {
  const [events, setEvents] = useState([]);

  const handleEventAdd = (event) => {
    // Logic to add event, potentially involving an API call
    // For the decoupled form, this might be triggered by the form's submission
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent) => {
    // Logic to update event
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleEventDelete = (eventId) => {
    // Logic to delete event
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd} // This might change to onEventClickToAdd or similar, with a separate form handling actual addition
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="month"
    />
  );
}
```

## Original Props

| Prop            | Type                                     | Default   | Description                                                                  |
| --------------- | ---------------------------------------- | --------- | ---------------------------------------------------------------------------- |
| `events`        | `CalendarEvent[]`                        | `[]`      | Array of events to display in the calendar                                   |
| `onEventAdd`    | `(event: CalendarEvent) => void`         | -         | Callback function when an event is added (may be revised with form decoupling) |
| `onEventUpdate` | `(event: CalendarEvent) => void`         | -         | Callback function when an event is updated                                   |
| `onEventDelete` | `(eventId: string) => void`              | -         | Callback function when an event is deleted                                   |
| `className`     | `string`                                 | -         | Additional CSS class for styling                                             |
| `initialView`   | `"month" \| "week" \| "day" \| "agenda"` | `"month"` | Initial view mode of the calendar                                            |

## Original Event Object Structure

```typescript
interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  color?: "sky" | "amber" | "violet" | "rose" | "emerald" | "orange"
  location?: string
  // Planned: Support for additional generic properties
  // [key: string]: any; // Example for generic properties
}
```

## Original View Modes

### Month View
Displays a traditional month calendar with events. Events that span multiple days are properly displayed across the days they span.

### Week View
Shows a detailed week view with hour slots. Events are positioned according to their time and can span multiple days.

### Day View
Provides a detailed view of a single day with hour slots. Perfect for seeing all events scheduled for a specific day.

### Agenda View
Lists all events in a chronological list format, making it easy to see upcoming events at a glance.

## Original Limitations and Known Issues (To Be Addressed)

This calendar component is in early alpha stage and is not recommended for production use. There are several limitations and issues that need to be addressed (many of which are targets for improvement in this fork):

### Drag and Drop Limitations
- In month view, only the first day of multi-day events is draggable
- In week and day views, multi-day events are placed in an "All day" section at the top of the view and are not draggable
- Some drag and drop operations may not update the event data correctly in certain edge cases

### Visual and UX Issues
- Limited responsiveness on very small screens
- Event overlapping is not handled optimally in some views
- Limited keyboard navigation support
- Accessibility features are incomplete

### Technical Limitations
- Limited testing across different browsers and devices
- Performance may degrade with a large number of events
- Time zone support is limited
- No recurring event support
- No integration with external calendars (Google, Outlook, etc.)

### Other Considerations
- The component has not undergone extensive testing
- Error handling is minimal
- Documentation is still evolving

We are actively working on improving these aspects and welcome contributions to address these limitations, especially those aligned with the fork's roadmap.

## Contributing to this Fork

Contributions are welcome! Please feel free to submit a Pull Request, particularly for tasks outlined in the **Fork Development Roadmap**.

1.  Fork this repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please ensure your code adheres to any existing linting and formatting guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details. (Assuming the license remains the same, otherwise update as needed).
```