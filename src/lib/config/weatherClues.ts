import type { WeatherClue } from '$lib/utils/weatherClues';
import { getWeatherIcon } from '$lib/utils/weatherIcon';
import type { HourlyWeatherItem } from '$lib/utils/weatherItem';
import dayjs from '$lib/utils/dayjs';

export const HOURLY_WEATHER_CLUES: WeatherClue<HourlyWeatherItem>[] = [
	{
		property: 'weatherCode',
		isApplicable: (value, item) => {
			if ([0, 1, 2, 3].includes(value)) {
				return dayjs(item.time).hour() >= 6 && dayjs(item.time).hour() <= 20;
			}

			return true;
		},
		getPriority(value) {
			if ([45, 48, 55, 57, 65, 67, 75, 77, 82, 86, 95, 96, 99].includes(value)) {
				return 100;
			} else if ([63, 73, 80, 81, 85]) {
				return 80;
			} else if (value < 3 || [51, 53, 56, 61, 71]) {
				return 40;
			}

			return 10;
		},
		getIcon(value) {
			return getWeatherIcon(value);
		},
		getLabel(value) {
			if (value === 0) {
				return 'clearSky';
			} else if (value === 1) {
				return 'mainlyClear';
			} else if ([2, 3].includes(value)) {
				return 'cloudyOrOvercast';
			} else if ([45, 48].includes(value)) {
				return 'fog';
			} else if ([51, 56].includes(value)) {
				return 'drizzle';
			} else if ([53, 55, 57].includes(value)) {
				return 'heavyDrizzle';
			} else if ([61, 63, 65, 66, 67].includes(value)) {
				return 'rain';
			} else if ([71, 73, 75, 77].includes(value)) {
				return 'snow';
			} else if ([80, 81, 82].includes(value)) {
				return 'rainShowers';
			} else if ([85, 86].includes(value)) {
				return 'snowShowers';
			} else if ([95, 96, 99].includes(value)) {
				return 'thunderstorm';
			}

			return 'error';
		}
	},
	{
		property: 'uvIndex',
		isApplicable(value) {
			return value > 5;
		},
		getPriority() {
			return 100;
		},
		getIcon() {
			return 'sun';
		},
		getLabel() {
			return 'highUvIndex';
		}
	}
];
