import type { LatLng, LocationInfo } from '$lib/utils/common';

export type LocationChangeEventPayload = {
	latLng: LatLng;
	locationInfo: LocationInfo;
};
