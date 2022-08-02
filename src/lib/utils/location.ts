import type { LatLng, LocationInfo } from './common';

type LocationApiResponse = {
	query: string;
	status: 'success' | 'fail';
	message?: string;
	[index: string]: string | number | undefined;
};

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

export type LocationData = {
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

const getLocationFromClientAddress = async (clientAddress: string): Promise<LocationData> => {
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
	}

	return {
		latLng,
		locationInfo
	};
};

export const resolveLocation = async (
	locals: App.Locals,
	clientAddress: string
): Promise<LocationData> => {
	let { latLng, locationInfo } = locals.session.data;

	if (!latLng || JSON.stringify(latLng) === JSON.stringify(LAT_LNG_DEFAULT)) {
		const locationData = await getLocationFromClientAddress(clientAddress);
		latLng = locationData.latLng;
		locationInfo = locationData.locationInfo;

		await locals.session.set({
			latLng,
			locationInfo
		});
	} else {
		await locals.session.refresh();
	}

	return {
		latLng,
		locationInfo
	};
};
