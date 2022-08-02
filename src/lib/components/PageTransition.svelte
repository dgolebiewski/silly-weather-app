<script lang="ts">
	import { browser } from '$app/env';

	import { onMount } from 'svelte';

	import { fly } from 'svelte/transition';

	const TRANSITION_DURATION = 500;

	export let pathname = '';

	let screenWidth: number = 500;

	onMount(() => {
		if (!browser) {
			return;
		}

		screenWidth = window.innerWidth;
	});
</script>

{#key pathname}
	<div
		in:fly={{
			x: -screenWidth,
			duration: TRANSITION_DURATION,
			delay: TRANSITION_DURATION,
			opacity: 1
		}}
		out:fly={{ x: screenWidth, duration: TRANSITION_DURATION, opacity: 1 }}
	>
		<slot />
	</div>
{/key}
