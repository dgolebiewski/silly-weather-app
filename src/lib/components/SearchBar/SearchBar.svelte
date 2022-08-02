<script lang="ts">
	import type { LatLng, LocationInfo } from '$lib/utils/common';
	import DetectLocationButton from '$lib/components/SearchBar/DetectLocationButton.svelte';
	import LocationAutocomplete from '$lib/components/LocationAutocomplete/LocationAutocomplete.svelte';
	import type { LocationChangeEventPayload } from '$lib/types/events';
	import { invalidate } from '$app/navigation';

	export let latLng: LatLng;
	export let locationInfo: LocationInfo;
	export let isNight: boolean = false;

	const onLocationChange = async (e: CustomEvent<LocationChangeEventPayload>) => {
		const response = await fetch(`/location`, {
			method: 'POST',
			body: JSON.stringify({
				latLng: e.detail.latLng,
				locationInfo: e.detail.locationInfo
			})
		});

		if (response.status === 200) {
			await invalidate('/');
		}
	};
</script>

<div class="mb-8" class:text-white={isNight}>
	<LocationAutocomplete on:locationChange={onLocationChange} />
	<DetectLocationButton
		currentLatLng={latLng}
		{locationInfo}
		on:locationChange={onLocationChange}
	/>
</div>
