import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	const data = await request.json();

	if (!Object.keys(data).includes('latLng') || !Object.keys(data).includes('locationInfo')) {
		return {
			status: 400,
			body: {
				message: 'Request is missing some required query params.'
			}
		};
	}

	await locals.session.set({
		...locals.session.data,
		latLng: data.latLng,
		locationInfo: data.locationInfo
	});

	return {
		status: 200
	};
};
