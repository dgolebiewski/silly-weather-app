import type { LocationInfo } from './common';

export type CommonUnit = 'metric' | 'imperial' | 'custom';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindspeedUnit = 'kmh' | 'mph' | 'kn';
export type PrecipitationUnit = 'mm' | 'inch';

export type AppSettings = {
	temperatureUnit: TemperatureUnit;
	windspeedUnit: WindspeedUnit;
	precipitationUnit: PrecipitationUnit;
	language: string;
};

export const UNITS_OPTIONS = ['metric', 'imperial', 'custom'];
export const TEMPERATURE_UNIT_OPTIONS = ['celsius', 'fahrenheit'];
export const WINDSPEED_UNIT_OPTIONS = ['kmh', 'mph', 'kn'];
export const PRECIPITATION_UNIT_OPTIONS = ['mm', 'inch'];

export const getDefaultSettings = (locale?: string): AppSettings => {
	return {
		temperatureUnit: 'celsius',
		windspeedUnit: 'kmh',
		precipitationUnit: 'mm',
		language: locale || 'en'
	};
};

export const getCommonUnitsValue = (settings: AppSettings): CommonUnit => {
	if (
		settings.temperatureUnit === 'celsius' &&
		settings.windspeedUnit === 'kmh' &&
		settings.precipitationUnit === 'mm'
	) {
		return 'metric';
	} else if (
		settings.temperatureUnit === 'fahrenheit' &&
		settings.windspeedUnit === 'mph' &&
		settings.precipitationUnit === 'inch'
	) {
		return 'imperial';
	}

	return 'custom';
};

const APP_SETTINGS_PROPERTIES = [
	'temperatureUnit',
	'windspeedUnit',
	'precipitationUnit',
	'language'
];
export const validateSettings = (settings: any): settings is AppSettings => {
	if (!APP_SETTINGS_PROPERTIES.every((property) => property in settings)) {
		return false;
	}

	return (
		TEMPERATURE_UNIT_OPTIONS.includes(settings.temperatureUnit) &&
		WINDSPEED_UNIT_OPTIONS.includes(settings.windspeedUnit) &&
		PRECIPITATION_UNIT_OPTIONS.includes(settings.precipitationUnit)
	);
};

export const resolveSettings = async (
	locals: App.Locals,
	locationInfo: LocationInfo,
	locales: string[]
): Promise<AppSettings> => {
	let settings = locals.session.data.settings;

	if (!settings || !validateSettings(settings)) {
		settings = getDefaultSettings(
			locales.includes(locationInfo.countryCode.toLowerCase())
				? locationInfo.countryCode.toLowerCase()
				: 'en'
		);
		await locals.session.set({
			...locals.session.data,
			settings
		});
	}

	return settings;
};
