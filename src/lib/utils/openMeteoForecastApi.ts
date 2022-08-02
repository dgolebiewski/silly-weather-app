import type { LatLng } from '$lib/utils/common';
import dayjs, { roundToFullHour } from '$lib/utils/dayjs';
import type { Dayjs } from 'dayjs';
import type { AppSettings } from './settings';
import { uvIndexFromShortwaveRadiation } from './uvIndex';
import type { DailyWeatherItem, HourlyWeatherItem, PrecipitationType } from './weatherItem';

type OpenMeteoCurrentWeather = {
	temperature: number;
	windspeed: number;
	winddirection: number;
	weathercode: number;
	time: string;
};

type OpenMeteoHourlyWeather = {
	time: string[];
	temperature_2m: number[];
	relativehumidity_2m: number[];
	snowfall: number[];
	rain: number[];
	showers: number[];
	weathercode: number[];
	windspeed_10m: number[];
	diffuse_radiation: number[];
	apparent_temperature: number[];
	surface_pressure: number[];
};

type OpenMeteoDailyWeather = {
	time: string[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	apparent_temperature_max: number[];
	rain_sum: number[];
	showers_sum: number[];
	snowfall_sum: number[];
	weathercode: number[];
	sunrise: string[];
	sunset: string[];
	windspeed_10m_max: number[];
};

type OpenMeteoResponse = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	ufc_offset_seconds: 0;
	elevation: 27;
	current_weather?: OpenMeteoCurrentWeather;
	hourly?: OpenMeteoHourlyWeather;
	daily?: OpenMeteoDailyWeather;
};

type OpenMeteoErrorResponse = {
	error: true;
	reason: string;
};

export const OPEN_METEO_TIME_FORMAT = 'YYYY-MM-DD[T]HH:mm[Z]';
export const OPEN_METEO_TIME_FORMAT_SHORT = 'YYYY-MM-DD';

const isOpenMeteoErrorResponse = (
	response: OpenMeteoResponse | OpenMeteoErrorResponse
): response is OpenMeteoErrorResponse => {
	return Object.keys(response).includes('error');
};

const transformHourlyWeather = (
	openMeteoHourlyWeather: OpenMeteoHourlyWeather
): HourlyWeatherItem[] => {
	const {
		time,
		temperature_2m,
		relativehumidity_2m,
		snowfall,
		rain,
		showers,
		weathercode,
		windspeed_10m,
		diffuse_radiation,
		apparent_temperature,
		surface_pressure
	} = openMeteoHourlyWeather;

	return time.map((item, index) => {
		let precipitationType: PrecipitationType = 'rain';
		let precipitation = rain[index];
		if (snowfall[index] > precipitation) {
			precipitationType = 'snow';
			precipitation = snowfall[index];
		}
		if (showers[index] > precipitation) {
			precipitationType = 'showers';
			precipitation = showers[index];
		}

		return {
			time: `${item}Z`,
			temperature: temperature_2m[index],
			humidity: relativehumidity_2m[index],
			precipitationType,
			precipitation,
			weatherCode: weathercode[index],
			windSpeed: windspeed_10m[index],
			diffuseRadiation: diffuse_radiation[index],
			uvIndex: uvIndexFromShortwaveRadiation(diffuse_radiation[index], weathercode[index]),
			apparentTemperature: apparent_temperature[index],
			surfacePressure: surface_pressure[index]
		};
	});
};

const transformDailyWeather = (
	openMeteoDailyWeather: OpenMeteoDailyWeather
): DailyWeatherItem[] => {
	const {
		time,
		temperature_2m_max,
		temperature_2m_min,
		apparent_temperature_max,
		rain_sum,
		showers_sum,
		snowfall_sum,
		weathercode,
		sunrise,
		sunset,
		windspeed_10m_max
	} = openMeteoDailyWeather;

	return time.map((item, index) => {
		let precipitationType: PrecipitationType = 'rain';
		let precipitation = rain_sum[index];
		if (showers_sum[index] > precipitation) {
			precipitationType = 'showers';
			precipitation = showers_sum[index];
		}
		if (snowfall_sum[index] > precipitation) {
			precipitationType = 'snow';
			precipitation = snowfall_sum[index];
		}

		return {
			time: item,
			temperatureMax: temperature_2m_max[index],
			temperatureMin: temperature_2m_min[index],
			apparentTemperatureMax: apparent_temperature_max[index],
			precipitationType,
			precipitation,
			weatherCode: weathercode[index],
			sunrise: `${sunrise[index]}Z`,
			sunset: `${sunset[index]}Z`,
			windSpeed: windspeed_10m_max[index]
		};
	});
};

const fetchForecast = async (
	latLng: LatLng,
	daily: string[] | null = null,
	hourly: string[] | null = null,
	settings: AppSettings | null = null,
	startDate: Dayjs | null = null,
	endDate: Dayjs | null = null
): Promise<OpenMeteoResponse | OpenMeteoErrorResponse> => {
	const params = new URLSearchParams();
	params.append('latitude', latLng.latitude.toString());
	params.append('longitude', latLng.longitude.toString());
	params.append('timezone', 'UTC');
	if (settings) {
		params.append('temperature_unit', settings.temperatureUnit);
		params.append('windspeed_unit', settings.windspeedUnit);
		params.append('precipitation_unit', settings.precipitationUnit);
	}
	if (startDate && endDate) {
		params.append('start_date', startDate.format(OPEN_METEO_TIME_FORMAT_SHORT));
		params.append('end_date', endDate.format(OPEN_METEO_TIME_FORMAT_SHORT));
	}

	let queryString = params.toString();

	// This doesn't work with URLSearchParams as it encodes coma and causes the API to error out.
	if (daily) {
		queryString += `&daily=${daily.join(',')}`;
	}
	if (hourly) {
		queryString += `&hourly=${hourly.join(',')}`;
	}

	const response = await fetch(`${import.meta.env.VITE_OPEN_METEO_FORECAST_URL}?${queryString}`);

	return (await response.json()) as OpenMeteoResponse | OpenMeteoErrorResponse;
};

export type WeatherForecast = {
	currentWeather?: HourlyWeatherItem;
	nightWeather?: HourlyWeatherItem;
	todayForecast?: DailyWeatherItem;
	tomorrowForecast?: DailyWeatherItem;
	hourlyForecast: HourlyWeatherItem[];
	dailyForecast: DailyWeatherItem[];
};
export const getWeatherForecast = async (
	latLng: LatLng,
	settings: AppSettings
): Promise<WeatherForecast | null> => {
	const forecast = await fetchForecast(
		latLng,
		[
			'temperature_2m_max',
			'temperature_2m_min',
			'apparent_temperature_max',
			'rain_sum',
			'showers_sum',
			'snowfall_sum',
			'weathercode',
			'sunrise',
			'sunset',
			'windspeed_10m_max'
		],
		[
			'temperature_2m',
			'relativehumidity_2m',
			'snowfall',
			'rain',
			'showers',
			'weathercode',
			'windspeed_10m',
			'diffuse_radiation',
			'apparent_temperature',
			'surface_pressure'
		],
		settings
	);

	if (isOpenMeteoErrorResponse(forecast) || !forecast.daily || !forecast.hourly) {
		return null;
	}

	const hourlyForecast = transformHourlyWeather(forecast.hourly);

	const closestFullHour = roundToFullHour(dayjs()).tz('UTC').format(OPEN_METEO_TIME_FORMAT);
	const currentWeather = hourlyForecast.find((item) => item.time === closestFullHour);

	const nightWeatherTime = dayjs()
		.hour(2)
		.minute(0)
		.second(0)
		.millisecond(0)
		.add(1, 'days')
		.tz('UTC')
		.format(OPEN_METEO_TIME_FORMAT);
	const nightWeather = hourlyForecast.find((item) => item.time === nightWeatherTime);

	const dailyForecast = transformDailyWeather(forecast.daily);

	const todayTime = dayjs().tz('UTC').format(OPEN_METEO_TIME_FORMAT_SHORT);
	const todayForecast = dailyForecast.find((item) => item.time === todayTime);

	const tomorrowTime = dayjs().tz('UTC').add(1, 'days').format(OPEN_METEO_TIME_FORMAT_SHORT);
	const tomorrowForecast = dailyForecast.find((item) => item.time === tomorrowTime);

	return {
		currentWeather,
		nightWeather,
		todayForecast,
		tomorrowForecast,
		hourlyForecast,
		dailyForecast
	};
};

export const isNightCurrently = async (latLng: LatLng, settings: AppSettings) => {
	// Must check for this eventuality, because idk if the session will be correctly loaded by this point :)
	if (!latLng || !settings) {
		return false;
	}

	const today = dayjs().hour(0).minute(0).second(0).millisecond(0);

	const forecast = await fetchForecast(
		latLng,
		['sunrise', 'sunset'],
		null,
		settings,
		today,
		today.add(1, 'day')
	);

	if (isOpenMeteoErrorResponse(forecast) || !forecast.daily || forecast.daily.time.length < 2) {
		return false;
	}

	const now = dayjs();
	const todaySunrise = dayjs(`${forecast.daily.sunrise[0]}Z`);
	const todaySunset = dayjs(`${forecast.daily.sunset[0]}Z`);
	const tomorrowSunrise = dayjs(`${forecast.daily.sunrise[1]}Z`);

	return (now.isAfter(todaySunset) && now.isBefore(tomorrowSunrise)) || now.isBefore(todaySunrise);
};
