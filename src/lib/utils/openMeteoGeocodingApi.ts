export type OpenMeteoGeocodingResult = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	elevation: number;
	feature_code: string;
	country_code: string;
	admin1_id: number;
	admin2_id: number;
	admin3_id: number;
	admin4_id: number;
	timezone: string;
	population: number;
	postcodes: string[];
	country_id: number;
	country: string;
	admin1: string;
	admin2: string;
	admin3: string;
	admin4: string;
};

export type OpenMeteoGeocodingResponse = {
	results?: OpenMeteoGeocodingResult[];
};

export type OpenMeteoGeocodingErrorResponse = {
	error: boolean;
	reason: string;
};

export type GeocodingResult = {
	name: string;
	latitude: number;
	longitude: number;
	countryCode: string;
	country: string;
	adminRegion: string;
};

const isOpenMeteoGeocodingErrorResponse = (
	response: OpenMeteoGeocodingResponse | OpenMeteoGeocodingErrorResponse
): response is OpenMeteoGeocodingErrorResponse => {
	return Object.keys(response).includes('error');
};

export const searchCity = async (
	search: string,
	language: string = 'en',
	count: number = 10
): Promise<GeocodingResult[]> => {
	const response = await fetch(
		`${
			import.meta.env.VITE_OPEN_METEO_GEOCODING_URL
		}?name=${search}&language=${language}&count=${count}`
	);

	const data = (await response.json()) as
		| OpenMeteoGeocodingResponse
		| OpenMeteoGeocodingErrorResponse;

	if (isOpenMeteoGeocodingErrorResponse(data) || !data.results) {
		return [];
	}

	return data.results.map(
		({ name, latitude, longitude, country_code, country, admin1, admin2, admin3, admin4 }) => ({
			name,
			latitude,
			longitude,
			countryCode: country_code,
			country,
			adminRegion: [admin4, admin3, admin2, admin1].filter((a) => !!a).join(', ')
		})
	);
};
