<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
	}>();

	const handleClick = (e: MouseEvent) => {
		dispatch('click', e);
	};

	type ButtonSize = 'small' | 'default';
	type ButtonVariant = 'minimal' | 'primary';

	export let size: ButtonSize = 'default';
	export let dark: boolean = false;
	export let variant: ButtonVariant = 'minimal';
	export let disabled: boolean = false;

	const PADDING_SMALL = 'px-2 py-1';
	const PADDING_DEFAULT = 'px-4 py-2';
	const TEXT_COLOR_DARK = 'text-white';
	const TEXT_COLOR_LIGHT = 'text-light';
	const VARIANT_MINIMAL = 'hover:bg-slate-500/20';
	const VARIANT_MINIMAL_DARK = 'hover:bg-slate-200/20';
	const VARIANT_PRIMARY = 'bg-blue-500 hover:bg-blue-400';

	let padding = PADDING_DEFAULT;
	let backgroundColor = VARIANT_MINIMAL;

	$: {
		switch (size) {
			case 'small':
				padding = PADDING_SMALL;
				break;
			case 'default':
				padding = PADDING_DEFAULT;
		}
	}

	$: textColor = dark || variant === 'primary' ? TEXT_COLOR_DARK : TEXT_COLOR_LIGHT;

	$: {
		switch (variant) {
			case 'minimal':
				backgroundColor = dark ? VARIANT_MINIMAL_DARK : VARIANT_MINIMAL;
				break;
			case 'primary':
				backgroundColor = VARIANT_PRIMARY;
				break;
		}
	}
</script>

<button
	class="{padding} {textColor} {backgroundColor} {disabled
		? 'opacity-40'
		: ''} rounded-md transition-colors"
	on:click={handleClick}
	{disabled}
>
	<slot />
</button>
