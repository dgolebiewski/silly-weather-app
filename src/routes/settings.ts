import { validateSettings } from '$lib/utils/settings';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

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
