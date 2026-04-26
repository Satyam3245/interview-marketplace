import {
  format,
  isToday,
  isTomorrow,
  addDays,
  addMinutes,
  isBefore,
  isAfter,
  set,
  differenceInMinutes,
} from "date-fns";

/**
 * Interface representing an existing booking for conflict checking.
 */
interface BookedSlot {
  startTime: string | Date;
  endTime: string | Date;
}

/**
 * Interface for the generated UI slot.
 */
interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  available: boolean;
}

/**
 * Interface for the date tab labels.
 */
interface DateTab {
  top: string;
  bottom: string;
}

// "Mon, Mar 24, 2026" — used in appointment cards
export function formatDate(iso: string | Date | number): string {
  return format(new Date(iso), "EEE, MMM d, yyyy");
}

// "Monday, March 24, 2026" — used in the booking confirm card
export function formatDateFull(date: string | Date | number): string {
  return format(new Date(date), "EEEE, MMMM d, yyyy");
}

// "9:30 AM" — used anywhere a time-only string is needed
export function formatTime(date: string | Date | number): string {
  return format(new Date(date), "h:mm a");
}

// "1h 30m" or "45m" — used in appointment cards to show session length
export function formatDuration(start: string | Date | number, end: string | Date | number): string {
  const mins = differenceInMinutes(new Date(end), new Date(start));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ""}` : `${m}m`;
}

// Returns { top, bottom } label for each date tab in SlotPicker.
export function formatDateTab(date: Date): DateTab {
  const bottom = format(date, "MMM d");
  if (isToday(date)) return { top: "Today", bottom };
  if (isTomorrow(date)) return { top: "Tomorrow", bottom };
  return { top: format(date, "EEE"), bottom };
}

// Produces an array of Date objects starting from today
export function generateDates(daysAhead: number): Date[] {
  return Array.from({ length: daysAhead }, (_, i) => addDays(new Date(), i));
}

/**
 * Splits an interviewer's daily availability window into fixed-length slots.
 */
export function generateSlots(
  date: Date | string | number,
  availStartTime: Date | string,
  availEndTime: Date | string,
  bookedSlots: BookedSlot[],
  slotDurationMinutes: number
): TimeSlot[] {
  const avStart = new Date(availStartTime);
  const avEnd = new Date(availEndTime);

  // Apply the availability hours/minutes onto the target calendar day
  const start = set(new Date(date), {
    hours: avStart.getHours(),
    minutes: avStart.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });

  const end = set(new Date(date), {
    hours: avEnd.getHours(),
    minutes: avEnd.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });

  const now = new Date();
  const slots: TimeSlot[] = [];
  let cursor = start;

  while (isBefore(cursor, end)) {
    const slotEnd = addMinutes(cursor, slotDurationMinutes);

    // Drop the last partial slot if it would overflow the window
    if (isAfter(slotEnd, end)) break;

    const isBooked = bookedSlots.some(
      (b) =>
        isBefore(cursor, new Date(b.endTime)) &&
        isAfter(slotEnd, new Date(b.startTime))
    );

    // Only push future slots — past ones are silently skipped
    if (isAfter(cursor, now)) {
      slots.push({
        startTime: cursor,
        endTime: slotEnd,
        isBooked,
        available: !isBooked,
      });
    }

    cursor = slotEnd;
  }

  return slots;
}