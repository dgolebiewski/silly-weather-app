<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import type { LocationInfo } from '$lib/utils/common';
	import DetectLocationButton from './DetectLocationButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LocationChangeEventPayload } from '$lib/types/events';
	import LocationAutocomplete from '$lib/components/LocationAutocomplete/LocationAutocomplete.svelte';
	import Settings from '$lib/components/Settings/Settings.svelte';
	import type { AppSettings } from '$lib/utils/settings';

	const dispatch = createEventDispatcher<{
		locationChange: LocationChangeEventPayload;
	}>();

	export let locationInfo: LocationInfo;
	export let isNight: boolean;
	export let settings: AppSettings;

	const onLocationChange = ({ detail }: CustomEvent<LocationChangeEventPayload>) => {
		dispatch('locationChange', detail);
	};
</script>

<div class="py-6 w-full mb-6 relative" class:text-white={isNight}>
	<h1 class="text-6xl text-center font-bold w-full max-w-xl mx-auto mb-4">{$t('common.title')}</h1>
	<div class="absolute top-2 right-2 xl:top-8 xl:right-8">
		<Settings {settings} />
	</div>
	<LocationAutocomplete on:locationChange={onLocationChange} />
	<DetectLocationButton {locationInfo} on:locationChange={onLocationChange} />
</div>
