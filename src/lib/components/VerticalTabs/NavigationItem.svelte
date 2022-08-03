<script lang="ts">
	import type { Tab } from '$lib/types/tabs';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		selectTab: number;
	}>();

	export let tab: Tab;
	export let active: boolean = false;
	export let id: number;

	const handleClick = () => {
		dispatch('selectTab', id);
	};
</script>

<button
	class="px-3 py-2 w-full md:w-64 rounded-md hover:bg-slate-500/20 transition-colors {active
		? 'bg-sky-500/20'
		: ''}"
	on:click={handleClick}
>
	{tab.title}
</button>
