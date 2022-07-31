<script lang="ts">
	import { t } from '$lib/i18n/translations';

	export let icon: string;
	export let label: string;
	export let value: string | number;
	export let unit: string | null;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="flex justify-center items-center">
		<i class="mi-{icon} mr-1" />
		<h4 class="font-medium text-sm md:text-base">{$t(`common.weatherStat.${label}.short`)}</h4>
	</div>

	<div class="flex justify-center items-end">
		<p class="text-xl md:text-3xl text-right font-bold mr-1">{value}</p>
		{#if unit}
			<p class="md:text-xl leading-7 font-bold opacity-60">{$t(`common.units.${unit}`)}</p>
		{/if}
	</div>
</div>
