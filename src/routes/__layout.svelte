<script context="module" lang="ts">
	import { locale, loadTranslations } from '$lib/i18n/translations';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ url }: LoadEvent) => {
		const { pathname } = url;

		const defaultLocale = 'en';

		const initLocale = locale.get() || defaultLocale;

		await loadTranslations(initLocale, pathname);

		return {};
	};
</script>

<script>
	import '../app.css';
</script>

<slot />
