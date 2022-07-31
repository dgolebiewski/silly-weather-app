<script lang="ts">
	import type { WeatherStat } from '$lib/utils/weatherStats';
	import { t } from '$lib/i18n/translations';

	export let stat: WeatherStat;

	$: ({ icon, labelCode, value, unit } = stat);
</script>

<div class="flex justify-between items-center py-3 border-b-2 border-b-white border-opacity-20">
	<p class="font-bold opacity-60 text-xl">
		<i class="mi-{icon} mr-1" />
		{$t(`common.weatherStat.${labelCode}.default`)}
	</p>
	<div class="flex justify-end items-end">
		<p class="font-bold text-2xl md:text-4xl text-right">
			{value}
		</p>
		{#if unit}
			<p class="font-bold opacity-60 ml-1">{$t(`common.units.${unit}`)}</p>
		{/if}
	</div>
</div>
