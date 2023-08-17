interface EventButtonElement extends HTMLButtonElement {
  "data-is_all_day_checked": string;
  "data-event_color": string;
  "data-event_name": string;
  "data-event_date": string;
  "data-start_time": string;
  "data-end_time": string;
}

type removedEventType = {
  event: EventButtonElement;
  parent: HTMLElement;
};
