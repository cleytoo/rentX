import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end = this.convertToUTC(end_date);
    const start = this.convertToUTC(start_date);

    const time = dayjs(end).diff(start, "hours");

    return time;
  }

  dateNow() {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    const data = dayjs(date).utc().local().format();

    return data;
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end = this.convertToUTC(end_date);
    const start = this.convertToUTC(start_date);

    const time = dayjs(end).diff(start, "days");

    return time;
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
