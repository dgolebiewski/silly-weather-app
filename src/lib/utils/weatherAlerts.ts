export type WeatherAlertType = 'warning' | 'critical';

export type WeatherAlert = {
	type: WeatherAlertType;
	messageCode: string;
	weatherCodes: number[];
};

const ALERTS: WeatherAlert[] = [
	{
		type: 'warning',
		messageCode: 'fog',
		weatherCodes: [45, 48]
	},
	{
		type: 'warning',
		messageCode: 'heavySnowfall',
		weatherCodes: [75, 86]
	},
	{
		type: 'warning',
		messageCode: 'violentRainShowers',
		weatherCodes: [82]
	},
	{
		type: 'warning',
		messageCode: 'thunderstorm',
		weatherCodes: [95]
	},
	{
		type: 'critical',
		messageCode: 'thunderstormWithSlightHail',
		weatherCodes: [96]
	},
	{
		type: 'critical',
		messageCode: 'thunderstormWithHeavyHail',
		weatherCodes: [99]
	}
];

export const getWeatherAlert = (weatherCode: number): WeatherAlert | null => {
	return ALERTS.find((alert) => alert.weatherCodes.includes(weatherCode)) || null;
};
