<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Variant = 'default' | 'light' | 'dark';

	export let variant: Variant = 'default';
	export let disabled = false;

	const dispatch = createEventDispatcher();

	const COLORS_DEFAULT = 'text-blue-500 hover:text-blue-600';
	const COLORS_LIGHT = 'text-grey-200 hover:text-grey-300';
	const COLORS_DARK = 'text-grey-600 hover:text-grey-500';

	let colors = COLORS_LIGHT;

	$: {
		switch (variant) {
			case 'default':
				colors = COLORS_DEFAULT;
				break;
			case 'dark':
				colors = COLORS_DARK;
				break;
			case 'light':
				colors = COLORS_LIGHT;
				break;
		}
	}
</script>

<button
	class="bg-none {colors} transition-colors disabled:opacity-60"
	{disabled}
	on:click={(e) => dispatch('click', e)}
>
	<slot />
</button>
