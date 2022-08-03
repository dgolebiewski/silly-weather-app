<script lang="ts">
	import type { Tab } from '$lib/types/tabs';
	import { fly } from 'svelte/transition';
	import Navigation from './Navigation.svelte';

	export let tabs: Tab[];

	const TRANSITION_DURATION = 250;
	const TRANSITION_DISTANCE = 150;

	let activeTab = 0;

	const handleSelectTab = (e: CustomEvent<number>) => {
		const id = e.detail;

		if (id >= tabs.length) return;

		activeTab = id;
	};
</script>

<div class="md:flex items-start py-6">
	<Navigation {tabs} {activeTab} on:selectTab={handleSelectTab} />
	<div class="flex-grow mt-4 md:mt-0">
		{#key activeTab}
			<div
				class="md:pl-8"
				in:fly={{
					y: TRANSITION_DISTANCE,
					duration: TRANSITION_DURATION,
					delay: TRANSITION_DURATION
				}}
				out:fly={{
					y: -TRANSITION_DISTANCE,
					duration: TRANSITION_DURATION
				}}
			>
				<svelte:component
					this={tabs[activeTab].component}
					{...tabs[activeTab].componentProps || {}}
				/>
			</div>
		{/key}
	</div>
</div>
