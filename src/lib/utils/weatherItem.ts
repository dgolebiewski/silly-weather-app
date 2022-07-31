export type PrecipitationType = 'rain' | 'snow' | 'showers';
export type HourlyWeatherItem = {
	time: string;
	temperature: number;
	humidity: number;
	precipitationType: PrecipitationType;
	precipitation: number;
	weatherCode: number;
	windSpeed: number;
	diffuseRadiation: number;
	uvIndex: number;
	apparentTemperature: number;
	surfacePressure: number;
	[index: string]: number | string;
};

export type DailyWeatherItem = {
	time: string;
	temperatureMax: number;
	temperatureMin: number;
	apparentTemperatureMax: number;
	precipitationType: PrecipitationType;
	precipitation: number;
	weatherCode: number;
	sunrise: string;
	sunset: string;
	windSpeed: number;
	[index: string]: string | number;
};

export const isHourlyWeatherItem = (
	item: HourlyWeatherItem | DailyWeatherItem
): item is HourlyWeatherItem => {
	return !Object.keys(item).includes('temperatureMax');
};
