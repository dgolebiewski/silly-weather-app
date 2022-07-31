import { DAILY_STATS_TO_EVALUATE, HOURLY_STATS_TO_EVALUATE } from '$lib/config/weatherStats';
import type { AppSettings } from './settings';
import type { DailyWeatherItem, HourlyWeatherItem } from './weatherItem';
import { isHourlyWeatherItem } from './weatherItem';

export type WeatherStat = {
	icon: string;
	labelCode: string;
	value: number | string;
	unit: string | null;
};

export type RelevantWeatherStats = {
	primaryStats: WeatherStat[];
	secondaryStats: WeatherStat[];
};

export type StatResolveItem<WeatherItemType> = {
	key: string;
	icon?: string;
	getIcon?: (value: number | string, item: WeatherItemType) => string;
	getLabelCode?: (value: number | string, item: WeatherItemType) => string;
	shouldBePrimary?: (value: number | string, item: WeatherItemType) => boolean;
	getUnit?: (settings: AppSettings) => string;
};

export const getMostRelevantStats = (
	weather: HourlyWeatherItem | DailyWeatherItem,
	settings: AppSettings,
	primaryStatCount: number = 3,
	secondaryStatCount: number = 0
) => {
	const stats: RelevantWeatherStats = {
		primaryStats: [],
		secondaryStats: []
	};

	const statsToEvaluate = isHourlyWeatherItem(weather)
		? HOURLY_STATS_TO_EVALUATE
		: DAILY_STATS_TO_EVALUATE;

	for (let i = 0; i < statsToEvaluate.length; i++) {
		if (
			stats.primaryStats.length >= primaryStatCount &&
			stats.secondaryStats.length >= secondaryStatCount
		) {
			break;
		}

		const item = statsToEvaluate[i];
		const value = weather[item.key];

		const stat = {
			icon:
				// @ts-ignore
				(typeof item.getIcon === 'function' ? item.getIcon(value, weather) : item.icon) ||
				'circle-help',
			labelCode:
				// @ts-ignore
				typeof item.getLabelCode === 'function' ? item.getLabelCode(value, weather) : item.key,
			value,
			unit: typeof item.getUnit === 'function' ? item.getUnit(settings) : null
		};

		if (stats.primaryStats.length < primaryStatCount) {
			const shouldBePrimary =
				// @ts-ignore
				(typeof item.shouldBePrimary === 'function' && item.shouldBePrimary(value, weather)) ||
				(typeof item.shouldBePrimary !== 'function' && value > 0);
			if (shouldBePrimary) {
				stats.primaryStats.push(stat);
			} else if (stats.secondaryStats.length < secondaryStatCount) {
				stats.secondaryStats.push(stat);
			}
		} else if (stats.secondaryStats.length < secondaryStatCount) {
			stats.secondaryStats.push(stat);
		}
	}

	return stats;
};
