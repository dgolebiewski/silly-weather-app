<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import { browser } from '$app/env';
	import { locale, loadTranslations } from '$lib/i18n/translations';
	import type { LoadEvent } from '@sveltejs/kit';
	import { isNightCurrently } from '$lib/utils/openMeteoForecastApi';

	type SettingsResponseBody = {
		settings: AppSettings;
	};

	export const load = async ({ url, session, fetch }: LoadEvent) => {
		const { pathname } = url;

		const _session = session as SessionData;

		let settings = _session.settings;

		const initLocale = browser
			? locale.get() || settings.language || 'en'
			: settings.language || 'en';
		locale.set(initLocale);

		await loadTranslations(initLocale, pathname);

		let isNight = false;

		if (session) {
			try {
				isNight = await isNightCurrently(_session.latLng, settings, fetch as any);
			} catch (e) {}
		}

		return {
			stuff: {
				isNight
			},
			props: {
				pathname: url.pathname,
				isNight
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import type { SessionData } from 'src/app';
	import Header from '$lib/components/Header.svelte';
	import LinkButton from '$lib/components/Input/LinkButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Container from '$lib/components/Container.svelte';
	import type { AppSettings } from '$lib/utils/settings';

	export let pathname: string;
	export let isNight: boolean;
</script>

<div class="min-h-screen relative pb-16 {isNight ? 'bg-slate-700 text-white' : 'bg-sky-200'}">
	{#if $navigating}
		<LoadingBar infinite />
	{/if}

	<Container>
		<Header {isNight}>
			{#if pathname === '/'}
				<LinkButton href="/settings" dark={isNight}>
					<i class="mi-settings" />
				</LinkButton>
			{:else}
				<LinkButton href="/" dark={isNight}>
					<i class="mi-home" />
				</LinkButton>
			{/if}
		</Header>

		<PageTransition {pathname}>
			<slot />
		</PageTransition>
	</Container>

	<Footer dark={isNight} />
</div>
