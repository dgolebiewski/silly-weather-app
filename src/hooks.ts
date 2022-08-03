import { locales } from '$lib/i18n/translations';
import { resolveLocation } from '$lib/utils/location';
import { resolveSettings } from '$lib/utils/settings';
import type { RequestEvent } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }: RequestEvent) {
	return locals.session.data;
}

// You can do it like this, without passing a own handle function
export const handle = handleSession(
	{
		secret: 'fL3UgbAWjYCWsMcNUqRXndAf3PuaWlE8'
	},
	async ({ event, resolve }) => {
		if (event.request.method === 'GET') {
			const { locationInfo } = await resolveLocation(event.locals, event.clientAddress);

			await resolveSettings(event.locals, locationInfo, locales.get());
		}

		return await resolve(event);
	}
);
