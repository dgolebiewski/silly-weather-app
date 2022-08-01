<script lang="ts">
	import type { LatLng, LocationInfo } from '$lib/utils/common';
	import type { LocationChangeEventPayload } from '$lib/types/events';
	import { t } from '$lib/i18n/translations';
	import TextButton from '$lib/components/TextButton.svelte';
	import { onMount, createEventDispatcher } from 'svelte';
	import { locale } from '$lib/i18n/translations';
	import { invalidate } from '$app/navigation';

	export let locationInfo: LocationInfo;

	let hasGeolocation = true;

	const dispatch = createEventDispatcher<{
		locationChange: LocationChangeEventPayload;
	}>();

	// incomplete type, as no other properties are needed
	// see: https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api
	type ReverseGeocodeResponse = {
		city: string;
		countryCode: string;
		locality: string;
	};

	let isDetectingLocation = false;

	const onGetCurrentPositionSuccess = async (position: GeolocationPosition) => {
		if (isDetectingLocation) {
			return;
		}

		isDetectingLocation = true;

		const latLng: LatLng = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};

		const locationDataResponse = await fetch(
			`${import.meta.env.VITE_REVERSE_GEOCODE_URL}?latitude=${latLng.latitude}&longitude=${
				latLng.longitude
			}&localityLanguage=${locale.get()}`
		);

		const locationData = (await locationDataResponse.json()) as ReverseGeocodeResponse;

		const locationInfo: LocationInfo = {
			city: locationData.city || locationData.locality,
			countryCode: locationData.countryCode
		};

		const response = await fetch(`/location`, {
			method: 'POST',
			body: JSON.stringify({
				latLng,
				locationInfo
			})
		});

		if (response.status === 200) {
			await invalidate('/');
		}

		dispatch('locationChange', {
			latLng,
			locationInfo
		});

		isDetectingLocation = false;
	};

	const detectLocation = () => {
		if (isDetectingLocation) {
			return;
		}

		if (!navigator.geolocation) {
			alert('Your browser does not support geolocation.');
			return;
		}

		navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, () => {
			alert('Unable to retrieve your current location.');
		});
	};

	onMount(() => {
		if (!navigator.geolocation) {
			hasGeolocation = false;
		}
	});
</script>

<div class="flex flex-col justify-center items-center">
	<p>{locationInfo.city}, {locationInfo.countryCode}</p>
	{#if hasGeolocation}
		<TextButton on:click={detectLocation} disabled={isDetectingLocation}>
			<i class="mi-location" />
			{$t('common.detectLocation.detect')}
		</TextButton>
	{/if}
</div>

<!-- <p>
	<span class="mr-4">
		{locationInfo.city}, {locationInfo.countryCode}
	</span>
	{#if hasGeolocation}
		<TextButton on:click={detectLocation} disabled={isDetectingLocation}>
			<i class="mi-location" />
			{$t('common.detectLocation.detect')}
		</TextButton>
	{/if}
</p> -->
