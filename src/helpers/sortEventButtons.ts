export function sortEventButtons(container: HTMLDivElement) {
  // Get all buttons within the container
  const buttons = container.getElementsByClassName("event");

  // Convert the HTML collection to an array
  const buttonsArray = Array.prototype.slice.call(buttons);

  // Define a custom compare function
  function compare(a: EventButtonElement, b: EventButtonElement) {
    // Check if data-is_all_day is true for either button
    const aIsAllDay = a.getAttribute(a["data-is_all_day_checked"]) === "true";
    const bIsAllDay = b.getAttribute(b["data-is_all_day_checked"]) === "true";

    if (aIsAllDay && !bIsAllDay) {
      return -1;
    } else if (!aIsAllDay && bIsAllDay) {
      return 1;
    } else {
      // If both buttons have the same value for data-is_all_day, compare data-start_time
      const aStartTime = a.getAttribute(a["data-start_time"]);
      const bStartTime = b.getAttribute(b["data-start_time"]);

      // Convert the start times to Date objects for comparison
      const aDate = new Date(`1/1/1970 ${aStartTime}`);
      const bDate = new Date(`1/1/1970 ${bStartTime}`);

      if (aDate < bDate) {
        return -1;
      } else if (aDate > bDate) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  // Sort the array using the custom compare function
  buttonsArray.sort(compare);

  // Update the DOM by reordering the buttons within the container
  for (let i = 0; i < buttonsArray.length; i++) {
    if (buttonsArray[i].classList.contains("events-view-more-btn")) {
      continue;
    }
    container.appendChild(buttonsArray[i]);
  }

  // Ensure that any button with the class 'events-view-more-btn' is always the last child of the container
  const moreButton = container.getElementsByClassName(
    "events-view-more-btn",
  )[0];
  if (moreButton) {
    container.appendChild(moreButton);
  }
}
