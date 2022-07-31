const ICON_WEATHER_CODE_MAP: Record<string, number[]> = {
	sun: [0],
	cloudy: [1, 2],
	cloud: [3],
	fog: [45, 48],
	rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
	snow: [71, 73, 75, 77, 85, 86],
	storm: [95, 96, 99]
};

export const getWeatherIcon = (weatherCode: number): string => {
	return (
		Object.keys(ICON_WEATHER_CODE_MAP).find((key) =>
			ICON_WEATHER_CODE_MAP[key].includes(weatherCode)
		) || 'sun'
	);
};
