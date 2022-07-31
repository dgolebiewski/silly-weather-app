import type { DailyWeatherItem } from './weatherItem';
import dayjs from './dayjs';

export const isNight = (todayWeather: DailyWeatherItem, tomorrowWeather: DailyWeatherItem) => {
	const sunset = dayjs(todayWeather.sunset);
	const nextSunrise = dayjs(tomorrowWeather.sunrise);

	return dayjs().isAfter(sunset) && dayjs().isBefore(nextSunrise);
};
