import type { RequestEvent } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }: RequestEvent) {
	return locals.session.data;
}

// You can do it like this, without passing a own handle function
export const handle = handleSession({
	secret: 'fL3UgbAWjYCWsMcNUqRXndAf3PuaWlE8'
});
