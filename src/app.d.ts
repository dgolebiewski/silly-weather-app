/// <reference types="@sveltejs/kit" />

import type { LatLng, LocationInfo } from '$lib/utils/common';
import type { AppSettings } from '$lib/utils/settings';
import type { Session } from 'svelte-kit-cookie-session';

interface SessionData {
	latLng: LatLng;
	locationInfo: LocationInfo;
	settings: AppSettings;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			session: Session<SessionData>;
			cookies: Record<string, string>;
		}
		// interface Platform {}
		// interface Session {}
		interface Stuff {
			isNight: boolean;
		}
	}
}
