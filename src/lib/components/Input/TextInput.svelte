<script lang="ts">
	import { COMMON_INPUT_CLASSES } from '$lib/utils/input';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		keyup: KeyboardEvent;
		focus: Event;
		blur: Event;
	}>();

	export const focus = () => {
		input.focus();
	};

	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let className: string = '';

	let input: HTMLInputElement;

	$: classes = className ? [COMMON_INPUT_CLASSES, className].join(' ') : COMMON_INPUT_CLASSES;
</script>

<input
	bind:this={input}
	class={classes}
	type="text"
	{placeholder}
	{disabled}
	bind:value
	on:keyup={(e) => dispatch('keyup', e)}
	on:focus={(e) => dispatch('focus', e)}
	on:blur={(e) => dispatch('blur', e)}
/>
