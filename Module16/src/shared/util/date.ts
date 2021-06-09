import { getHours, getMonth } from 'date-fns';

export function getRealHour(date: Date): number {
  return getHours(date) - 3;
}

export function getRealMonth(date: Date): number {
  return getMonth(date) + 1;
}
