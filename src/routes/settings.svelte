<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ props, stuff }: LoadEvent) => {
		return {
			props: {
				...props,
				isNight: stuff.isNight
			}
		};
	};
</script>

<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import Header from '$lib/components/Header.svelte';
	import LinkButton from '$lib/components/Input/LinkButton.svelte';
	import type { AppSettings } from '$lib/utils/settings';
	import VerticalTabs from '$lib/components/VerticalTabs/VerticalTabs.svelte';
	import GeneralContorls from '$lib/components/Settings/GeneralContorls.svelte';
	import UnitsControls from '$lib/components/Settings/UnitsControls.svelte';

	export let settings: AppSettings;
	export let isNight: boolean;
</script>

<svelte:head>
	<title>{$t('settings.title')} | {$t('common.title')}</title>
</svelte:head>

<Container>
	<Header>
		<LinkButton href="/" dark={isNight}>
			<i class="mi-home" />
		</LinkButton>
	</Header>

	<h2 class="text-4xl font-medium text-center">{$t('settings.title')}</h2>

	<VerticalTabs
		tabs={[
			{
				title: $t('settings.general.title'),
				component: GeneralContorls,
				componentProps: {
					settings
				}
			},
			{
				title: $t('settings.units.title'),
				component: UnitsControls,
				componentProps: {
					settings
				}
			}
		]}
	/>
</Container>

<Footer dark={isNight} />
