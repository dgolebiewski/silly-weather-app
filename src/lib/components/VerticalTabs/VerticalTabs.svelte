<script lang="ts">
	import type { Tab } from '$lib/types/tabs';
	import Navigation from './Navigation.svelte';

	export let tabs: Tab[];

	let activeTab = 0;

	const handleSelectTab = (e: CustomEvent<number>) => {
		const id = e.detail;

		if (id >= tabs.length) return;

		activeTab = id;
	};
</script>

<div class="flex py-6">
	<Navigation {tabs} {activeTab} on:selectTab={handleSelectTab} />
	<div class="pl-8 flex-grow">
		<svelte:component this={tabs[activeTab].component} {...tabs[activeTab].componentProps || {}} />
	</div>
</div>
