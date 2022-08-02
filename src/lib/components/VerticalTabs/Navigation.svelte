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

<div class="flex flex-col pr-4 border-r">
	{#each tabs as tab, index}
		<NavigationItem {tab} id={index} active={activeTab === index} on:selectTab={handleSelectTab} />
	{/each}
</div>
