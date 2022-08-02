import { locales } from '$lib/i18n/translations';
import { resolveLocation } from '$lib/utils/location';
import { getWeatherForecast } from '$lib/utils/openMeteoForecastApi';
import { resolveSettings } from '$lib/utils/settings';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ clientAddress, locals }: RequestEvent) => {
	const { latLng, locationInfo } = await resolveLocation(locals, clientAddress);

	const settings = await resolveSettings(locals, locationInfo, locales.get());

	const forecast = await getWeatherForecast(latLng, settings);

	if (!forecast) {
		return {
			status: 500
		};
	}

	return {
		body: {
			latLng,
			locationInfo,
			forecast,
			settings
		}
	};
};
