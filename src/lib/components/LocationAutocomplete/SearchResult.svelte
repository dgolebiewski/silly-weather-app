<script lang="ts">
	import type { GeocodingResult } from '$lib/utils/openMeteoGeocodingApi';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		selectLocation: GeocodingResult;
	}>();

	export let searchResult: GeocodingResult;
	export let isLastResult: boolean = false;

	const handleSelectLocation = () => {
		dispatch('selectLocation', searchResult);
	};
</script>

<div>
	<button
		class="flex flex-col text-left whitespace-nowrap text-ellipsis overflow-hidden w-64 md:w-96 px-4 py-2 hover:bg-gray-200 z-50 {isLastResult
			? 'rounded-b-md'
			: ''}"
		on:click={handleSelectLocation}
	>
		<span>{searchResult.name}, {searchResult.country}</span>
		<span class="text-gray-500 text-xs block w-100 text-ellipsis">{searchResult.adminRegion}</span>
	</button>
</div>
