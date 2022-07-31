import { HOURLY_WEATHER_CLUES } from '$lib/config/weatherClues';
import type { Dayjs } from 'dayjs';
import dayjs from '$lib/utils/dayjs';
import type { HourlyWeatherItem } from './weatherItem';

export type WeatherClue<WeatherForecastType> = {
	property: string;
	isApplicable: (value: number, item: WeatherForecastType) => boolean;
	getPriority: (value: number, item: WeatherForecastType) => number;
	getIcon: (value: number, item: WeatherForecastType) => string;
	getLabel: (value: number, item: WeatherForecastType) => string;
};

export type FinalWeatherClue = {
	time: Dayjs;
	priority: number;
	icon: string;
	labelCode: string;
};

export const getShortTermWeatherClues = (
	hourlyWeather: HourlyWeatherItem[],
	maxClues: number = 3
): FinalWeatherClue[] => {
	const clues: FinalWeatherClue[] = [];

	hourlyWeather.forEach((item) => {
		HOURLY_WEATHER_CLUES.forEach((potentialClue) => {
			const value = item[potentialClue.property] as number;
			if (!potentialClue.isApplicable(value, item)) {
				return;
			}

			clues.push({
				time: dayjs(item.time),
				priority: potentialClue.getPriority(value, item),
				icon: potentialClue.getIcon(value, item),
				labelCode: potentialClue.getLabel(value, item)
			});
		});
	});

	clues.sort((a, b) => {
		if (a.priority === b.priority) {
			return a.time.isAfter(b.time) ? 1 : -1;
		}

		return a.priority < b.priority ? -1 : 1;
	});

	const _clues = clues.filter(
		(value, index, self) => index === self.findIndex((c) => c.labelCode === value.labelCode)
	);

	_clues.sort((a, b) => (a.time.isAfter(b.time) ? 1 : -1));

	return _clues.slice(0, maxClues);
};
