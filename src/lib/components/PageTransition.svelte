<script lang="ts">
	import { fly } from 'svelte/transition';

	const TRANSITION_DURATION = 500;
	const TRANSITION_DISTANCE = 100;

	export let pathname = '';
</script>

{#key pathname}
	<div
		in:fly={{
			x: -TRANSITION_DISTANCE,
			duration: TRANSITION_DURATION,
			delay: TRANSITION_DURATION
		}}
		out:fly={{ x: TRANSITION_DISTANCE, duration: TRANSITION_DURATION }}
	>
		<slot />
	</div>
{/key}
