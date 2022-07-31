<script lang="ts">
	import HorizontalDragContainer from '$lib/components/HorizontalDragContainer.svelte';
	import Card from '../Card.svelte';

	export let className: string = '';
	export let title: string;
	export let disabled = false;
</script>

<Card className="flex flex-col justify-between bg-purple-500 {className}">
	<div>
		<h3 class="font-bold text-5xl leading-tight mb-4">{title}</h3>
		<slot name="secondaryContent" />
	</div>
	<HorizontalDragContainer {disabled}>
		<slot />
	</HorizontalDragContainer>
</Card>
