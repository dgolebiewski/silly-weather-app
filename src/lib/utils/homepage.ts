import type { Dayjs } from 'dayjs';
import dayjs, { roundToFullHour } from './dayjs';
import { isNight as checkIsNight } from './night';
import { OPEN_METEO_TIME_FORMAT, OPEN_METEO_TIME_FORMAT_SHORT } from './openMeteoForecastApi';
import type { AppSettings } from './settings';
import type { DailyWeatherItem, HourlyWeatherItem } from './weatherItem';
import { getMostRelevantStats, type WeatherStat } from './weatherStats';

export type WeatherCardProps = {
	time: Dayjs;
	isNight: boolean;
	weatherCode: number;
	temperature: number;
	isWholeDay: boolean;
	stats: WeatherStat[];
};

export type WeatherPoints = [WeatherCardProps, WeatherCardProps, WeatherCardProps];

const getWeatherCardProps = (
	weatherPoint: HourlyWeatherItem | DailyWeatherItem,
	isNight: boolean,
	isWholeDay: boolean,
	settings: AppSettings
): WeatherCardProps => {
	return {
		time: dayjs(weatherPoint.time),
		isNight,
		weatherCode: weatherPoint.weatherCode,
		temperature: (weatherPoint.temperature || weatherPoint.temperatureMax) as number,
		isWholeDay,
		stats: getMostRelevantStats(weatherPoint, settings).primaryStats
	};
};

const getNightWeather = (
	hourlyForecast: HourlyWeatherItem[],
	dayDelta: number = 1
): HourlyWeatherItem | undefined => {
	const nightWeatherTime = dayjs()
		.hour(2)
		.minute(0)
		.second(0)
		.millisecond(0)
		.add(dayDelta, 'days')
		.tz('UTC')
		.format(OPEN_METEO_TIME_FORMAT);
	return hourlyForecast.find((item) => item.time === nightWeatherTime);
};

export const getWeatherPoints = (
	hourlyForecast: HourlyWeatherItem[],
	dailyForecast: DailyWeatherItem[],
	settings: AppSettings
) => {
	const closestFullHour = roundToFullHour(dayjs()).tz('UTC').format(OPEN_METEO_TIME_FORMAT);
	const currentWeather = hourlyForecast.find((item) => item.time === closestFullHour);

	if (!currentWeather) {
		console.warn('Unable to get current weather.');
		return null;
	}

	const todayTime = dayjs().tz('UTC').format(OPEN_METEO_TIME_FORMAT_SHORT);
	const tomorrowTime = dayjs().add(1, 'days').tz('UTC').format(OPEN_METEO_TIME_FORMAT_SHORT);

	const todayWeather = dailyForecast.find((item) => item.time === todayTime);
	const tomorrowWeather = dailyForecast.find((item) => item.time === tomorrowTime);

	if (!todayWeather || !tomorrowWeather) {
		console.warn('Unable to get today or tomorrow weather.');
		return null;
	}

	const isNight = checkIsNight(todayWeather, tomorrowWeather);

	if (!isNight) {
		const nightWeather = getNightWeather(hourlyForecast);
		if (!nightWeather) {
			console.warn('Unable to get night weather.');
			return null;
		}

		return [
			getWeatherCardProps(currentWeather, false, false, settings),
			getWeatherCardProps(nightWeather, true, false, settings),
			getWeatherCardProps(tomorrowWeather, false, true, settings)
		];
	} else {
		const tomorrowNightWeather = getNightWeather(hourlyForecast, 2);
		if (!tomorrowNightWeather) {
			console.warn('Unable to get night weather.');
			return null;
		}

		return [
			getWeatherCardProps(currentWeather, true, false, settings),
			getWeatherCardProps(tomorrowWeather, false, true, settings),
			getWeatherCardProps(tomorrowNightWeather, true, false, settings)
		];
	}
};

export type HomepageTitleData = {
	labelCode: string;
	params: Record<string, string>;
};

export const getHomepageTitle = (
	currentWeather: HourlyWeatherItem,
	nightForecast: HourlyWeatherItem,
	tomorrowForecast: DailyWeatherItem,
	isNight: boolean
): HomepageTitleData => {
	if (isNight) {
		return {
			labelCode: 'homepage.title.night',
			params: {
				now: currentWeather.temperature.toString(),
				tomorrow: tomorrowForecast.temperatureMax.toString()
			}
		};
	}

	return {
		labelCode: 'homepage.title.day',
		params: {
			now: currentWeather.temperature.toString(),
			night: nightForecast.temperature.toString()
		}
	};
};
