<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import { locale, loadTranslations } from '$lib/i18n/translations';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ url, session }: LoadEvent) => {
		const { pathname } = url;

		const defaultLocale = 'en';

		const initLocale = locale.get() || defaultLocale;

		await loadTranslations(initLocale, pathname);

		const isNight = session
			? await isNightCurrently((session as SessionData).latLng, (session as SessionData).settings)
			: false;

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
	import { isNightCurrently } from '$lib/utils/openMeteoForecastApi';
	import type { SessionData } from 'src/app';
	import Header from '$lib/components/Header.svelte';
	import LinkButton from '$lib/components/Input/LinkButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Container from '$lib/components/Container.svelte';

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
