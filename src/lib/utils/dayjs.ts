import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pl';

dayjs.extend(customParseFormat);
dayjs.extend(isTomorrow);
dayjs.extend(timezone);
dayjs.extend(utc);

export const roundToFullHour = (date: Dayjs) => {
	return date
		.hour(date.hour() + Math.round(date.minute() / 60))
		.minute(0)
		.second(0)
		.millisecond(0);
};

export const ONE_HOUR = 1000 * 60 * 60;

export default dayjs;
