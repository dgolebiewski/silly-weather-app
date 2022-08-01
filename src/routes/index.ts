import { locales } from '$lib/i18n/translations';
import { getWeatherForecast } from '$lib/utils/openMeteoForecastApi';
import { getDefaultSettings, validateSettings } from '$lib/utils/settings';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { LatLng, LocationInfo } from 'src/lib/utils/common';

interface LocationApiResponse {
	query: string;
	status: 'success' | 'fail';
	message?: string;
	[index: string]: string | number | undefined;
}

type SuccessfulLocationApiResponse = LocationApiResponse & {
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	timezone: string;
	lat: number;
	lon: number;
};

type LocationData = {
	latLng: LatLng;
	locationInfo: LocationInfo;
};

const LAT_LNG_DEFAULT = {
	latitude: 40.71,
	longitude: -74.01
};

const LOCATION_INFO_DEFAULT = {
	city: 'New York',
	countryCode: 'US'
};

const isSuccessfulLocationApiResponse = (
	response: LocationApiResponse | SuccessfulLocationApiResponse
): response is SuccessfulLocationApiResponse => {
	return response.status === 'success';
};

const getLocationFromClientAddress = async (
	clientAddress: string
): Promise<Record<string, any>> => {
	const locationResponse = (await (
		await fetch(`${import.meta.env.VITE_LOCATION_API_URL}${clientAddress}`)
	).json()) as LocationApiResponse | SuccessfulLocationApiResponse;

	let latLng = LAT_LNG_DEFAULT;
	let locationInfo = LOCATION_INFO_DEFAULT;

	if (isSuccessfulLocationApiResponse(locationResponse)) {
		const { lat, lon, city, countryCode } = locationResponse;

		latLng = {
			latitude: lat,
			longitude: lon
		};

		locationInfo = {
			city,
			countryCode
		};

		return {
			latLng,
			locationInfo,
			locationResponse
		};
	}

	return {
		latLng,
		locationInfo
	};
};

export const GET: RequestHandler = async ({ clientAddress, locals }: RequestEvent) => {
	return {
		body: {
			debug: await getLocationFromClientAddress(clientAddress)
		}
	};

	// let { latLng, locationInfo, settings } = locals.session.data;

	// if (!latLng || JSON.stringify(latLng) === JSON.stringify(LAT_LNG_DEFAULT)) {
	// 	const locationData = await getLocationFromClientAddress(clientAddress);
	// 	latLng = locationData.latLng;
	// 	locationInfo = locationData.locationInfo;

	// 	await locals.session.set({
	// 		latLng,
	// 		locationInfo
	// 	});
	// } else {
	// 	await locals.session.refresh();
	// }

	// if (!settings || !validateSettings(settings)) {
	// 	await locals.session.set({
	// 		...locals.session.data,
	// 		settings: getDefaultSettings(
	// 			locales.get().includes(locationInfo.countryCode.toLowerCase())
	// 				? locationInfo.countryCode.toLowerCase()
	// 				: 'en'
	// 		)
	// 	});
	// }

	// const forecast = await getWeatherForecast(latLng, settings);

	// if (!forecast) {
	// 	return {
	// 		status: 500
	// 	};
	// }

	// return {
	// 	body: {
	// 		locationInfo,
	// 		forecast,
	// 		settings
	// 	}
	// };
};
