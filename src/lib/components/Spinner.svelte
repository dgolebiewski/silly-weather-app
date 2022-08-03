<script lang="ts">
	type SpinnerSize = 'sm' | 'lg';

	export let size: SpinnerSize = 'lg';
	export let className: string = '';

	const CLASSES_SM = 'w-3 h-3';
	const CLASSES_LG = 'w-8 h-8';

	let sizeClasses = CLASSES_LG;

	$: {
		switch (size) {
			case 'sm':
				sizeClasses = CLASSES_SM;
				break;
			case 'lg':
				sizeClasses = CLASSES_LG;
				break;
		}
	}
</script>

<div class={className} role="status">
	<div class="{sizeClasses} rounded-full border-b border-b-blue-600 animate-spin" />
	<span class="sr-only">Loading...</span>
</div>
