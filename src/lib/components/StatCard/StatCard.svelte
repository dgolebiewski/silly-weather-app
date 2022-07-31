<script lang="ts">
	import type { WeatherStat } from '$lib/utils/weatherStats';
	import { t } from '$lib/i18n/translations';
	import Card from '../Card.svelte';
	import StatLine from './StatLine.svelte';

	export let stats: WeatherStat[];
</script>

<Card className="bg-slate-600 flex flex-col justify-between">
	<h3 class="font-bold text-5xl leading-tight">{$t('common.statCard.title')}</h3>
	<div>
		{#each stats as stat}
			<StatLine {stat} />
		{/each}
	</div>
</Card>
