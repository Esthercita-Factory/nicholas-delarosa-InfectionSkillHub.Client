import { TIME_ZONE } from './api.config';

export interface AgendaDay<T> {
  /** yyyy-MM-dd in InfectionSkillHub local time. */
  key: string;
  /** ISO date of the first item, used to print the day heading. */
  date: string;
  items: T[];
}

/** Offset in minutes of the configured time zone ("-0500" gives -300). */
const OFFSET_MINUTES = (() => {
  const match = /^([+-])(\d{2})(\d{2})$/.exec(TIME_ZONE);
  return match ? (match[1] === '-' ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3])) : 0;
})();

/** Calendar day of an instant in InfectionSkillHub local time, so a 19:00 workshop never lands on the next UTC day. */
export function localDayKey(iso: string): string {
  return new Date(Date.parse(iso) + OFFSET_MINUTES * 60_000).toISOString().slice(0, 10);
}

/** Groups items by local day, keeping the order in which they arrive (the API sends them by start time). */
export function groupByDay<T>(items: readonly T[], dateOf: (item: T) => string): AgendaDay<T>[] {
  const days = new Map<string, AgendaDay<T>>();

  for (const item of items) {
    const key = localDayKey(dateOf(item));
    const day = days.get(key) ?? { key, date: dateOf(item), items: [] };
    day.items.push(item);
    days.set(key, day);
  }

  return [...days.values()];
}
