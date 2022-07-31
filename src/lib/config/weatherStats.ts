import type { DailyWeatherItem, HourlyWeatherItem } from '$lib/utils/weatherItem';
import type { StatResolveItem } from '$lib/utils/weatherStats';

const getPrecipitationIcon = (
	value: number | string,
	item: HourlyWeatherItem | DailyWeatherItem
) => {
	if (item.precipitationType === 'rain' || item.precipitationType === 'showers') return 'rain';

	return 'snow';
};

const getPrecipitationLabelCode = (
	value: number | string,
	item: HourlyWeatherItem | DailyWeatherItem
) => {
	return item.precipitationType;
};

export const HOURLY_STATS_TO_EVALUATE: StatResolveItem<HourlyWeatherItem>[] = [
	{
		key: 'precipitation',
		getIcon: getPrecipitationIcon,
		getLabelCode: getPrecipitationLabelCode,
		getUnit(settings) {
			return settings.precipitationUnit;
		}
	},
	{
		key: 'apparentTemperature',
		icon: 'temperature',
		getUnit(settings) {
			return settings.temperatureUnit;
		}
	},
	{
		key: 'uvIndex',
		icon: 'sun',
		shouldBePrimary(value) {
			return value > 5;
		}
	},
	{
		key: 'windSpeed',
		icon: 'wind',
		getUnit(settings) {
			return settings.windspeedUnit;
		}
	},
	{
		key: 'humidity',
		icon: 'drop',
		getUnit() {
			return '%';
		}
	},
	{
		key: 'surfacePressure',
		icon: 'compass',
		getUnit() {
			return 'hPa';
		}
	}
];

export const DAILY_STATS_TO_EVALUATE: StatResolveItem<DailyWeatherItem>[] = [
	{
		key: 'temperatureMin',
		icon: 'moon',
		getUnit(settings) {
			return settings.temperatureUnit;
		}
	},
	{
		key: 'precipitation',
		getIcon: getPrecipitationIcon,
		getLabelCode: getPrecipitationLabelCode,
		getUnit(settings) {
			return settings.precipitationUnit;
		}
	},
	{
		key: 'windSpeed',
		icon: 'wind',
		getUnit(settings) {
			return settings.windspeedUnit;
		}
	},
	{
		key: 'apparentTemperature',
		icon: 'temperature',
		getUnit(settings) {
			return settings.temperatureUnit;
		}
	}
];
