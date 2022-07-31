<script lang="ts">
	import { getShortTermWeatherClues } from '$lib/utils/weatherClues';
	import { t } from '$lib/i18n/translations';

	import type { HourlyWeatherItem } from '$lib/utils/weatherItem';
	import Card from '$lib/components/Card.svelte';
	import WeatherClue from './WeatherClue.svelte';

	export let hourlyForecast: HourlyWeatherItem[];

	$: clues = getShortTermWeatherClues(hourlyForecast);
</script>

<Card className="bg-slate-600 flex flex-col justify-between">
	<h3 class="font-bold text-5xl leading-tight">{$t('common.weatherClues.title')}</h3>
	<div>
		{#each clues as clue}
			<WeatherClue {clue} />
		{/each}
	</div>
</Card>
