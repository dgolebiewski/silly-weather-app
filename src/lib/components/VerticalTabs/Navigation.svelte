<script lang="ts">
	import type { Tab } from '$lib/types/tabs';
	import NavigationItem from './NavigationItem.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		selectTab: number;
	}>();

	export let tabs: Tab[];
	export let activeTab: number;

	const handleSelectTab = (e: CustomEvent<number>) => {
		dispatch('selectTab', e.detail);
	};
</script>

<div class="flex flex-col pb-4 border-b md:pb-0 md:pr-4 md:border-r md:border-b-0">
	{#each tabs as tab, index}
		<NavigationItem {tab} id={index} active={activeTab === index} on:selectTab={handleSelectTab} />
	{/each}
</div>
