<script lang="ts">
	import { t, locale } from '$lib/i18n/translations';
	import { tick, createEventDispatcher } from 'svelte';
	import { clickOutside } from 'svelte-use-click-outside';
	import { searchCity, type GeocodingResult } from '$lib/utils/openMeteoGeocodingApi';
	import TextInput from '$lib/components/Input/TextInput.svelte';
	import type { LocationChangeEventPayload } from '$lib/types/events';
	import type { LatLng, LocationInfo } from '$lib/utils/common';
	import SearchResult from './SearchResult.svelte';
	import Spinner from '../Spinner.svelte';

	const dispatch = createEventDispatcher<{
		locationChange: LocationChangeEventPayload;
	}>();

	let search: string = '';
	let isSearching: boolean = false;
	let searchResults: GeocodingResult[] = [];
	let searchResultsOpen: boolean = false;
	let timer: number | NodeJS.Timer;

	const updateSearch = async () => {
		if (search.length < 2) {
			return;
		}

		const results = await searchCity(search, locale.get());

		searchResults = results;
		isSearching = false;
	};

	const handleSelectLocation = (e: CustomEvent<GeocodingResult>) => {
		const location = e.detail;

		const latLng: LatLng = {
			latitude: location.latitude,
			longitude: location.longitude
		};

		const locationInfo: LocationInfo = {
			city: location.name,
			countryCode: location.countryCode
		};

		searchResultsOpen = false;
		search = '';
		searchResults = [];

		dispatch('locationChange', {
			latLng,
			locationInfo
		});
	};

	const handleKeyUp = () => {
		if (search.length >= 2) {
			isSearching = true;
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			updateSearch();
		}, 500);
	};

	const handleClickOutside = () => {
		searchResultsOpen = false;
	};
</script>

<div class="flex justify-center relative mb-4 z-10 text-black">
	<div use:clickOutside={handleClickOutside}>
		<TextInput
			on:keyup={handleKeyUp}
			on:focus={() => (searchResultsOpen = true)}
			className="w-64 md:w-96 {searchResultsOpen ? 'rounded-b-none' : ''}"
			placeholder={$t('common.locationAutocomplete.placeholder')}
			bind:value={search}
		/>
		{#if searchResultsOpen}
			<div class="absolute w-96 top-[42px] bg-white rounded-b-md">
				{#if isSearching}
					<div class="px-4 py-2 flex justify-center items-center">
						<Spinner />
					</div>
				{:else if search.length >= 2 && searchResults.length}
					{#each searchResults as result, index}
						<SearchResult
							searchResult={result}
							isLastResult={index === searchResults.length - 1}
							on:selectLocation={handleSelectLocation}
						/>
					{/each}
				{:else if search.length >= 2 && !searchResults.length}
					<p class="text-center px-4 py-2">{$t('common.locationAutocomplete.notFound')}</p>
				{:else}
					<p class="text-center px-4 py-2">
						{$t('common.locationAutocomplete.typeToSearch')}
					</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
