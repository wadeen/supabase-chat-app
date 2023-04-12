import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateToString = (date: string | Date, format: string) => {
  return dayjs.utc(date).tz("Asia/Tokyo").format(format);
};
