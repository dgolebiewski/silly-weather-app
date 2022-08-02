import { locales } from '$lib/i18n/translations';
import { resolveLocation } from '$lib/utils/location';
import { resolveSettings, validateSettings } from '$lib/utils/settings';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, clientAddress }: RequestEvent) => {
	const { locationInfo } = await resolveLocation(locals, clientAddress);

	const settings = await resolveSettings(locals, locationInfo, locales.get());

	return {
		body: {
			settings
		}
	};
};

export const POST: RequestHandler = async ({ request, locals }: RequestEvent) => {
	const data = await request.json();

	if (!validateSettings(data)) {
		return {
			status: 400
		};
	}

	await locals.session.set({
		...locals.session.data,
		settings: data
	});

	return {
		status: 200
	};
};
