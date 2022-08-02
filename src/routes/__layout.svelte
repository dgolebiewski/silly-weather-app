<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import { locale, loadTranslations } from '$lib/i18n/translations';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ url }: LoadEvent) => {
		const { pathname } = url;

		const defaultLocale = 'en';

		const initLocale = locale.get() || defaultLocale;

		await loadTranslations(initLocale, pathname);

		return {
			props: {
				pathname: url.pathname
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';

	export let pathname: string;
</script>

{#if $navigating}
	<LoadingBar infinite />
{/if}
<PageTransition {pathname}>
	<slot />
</PageTransition>
