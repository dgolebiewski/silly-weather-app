<script lang="ts">
	import type { DailyWeatherItem } from '$lib/utils/weatherItem';
	import { t } from '$lib/i18n/translations';
	import MultipleDataPointsCard from '../MultipleDataPointsCard/MultipleDataPointsCard.svelte';
	import WeatherCardSmall from '../WeatherCardSmall/WeatherCardSmall.svelte';
	import dayjs from 'dayjs';
	import type { AppSettings } from '$lib/utils/settings';

	export let dailyForecast: DailyWeatherItem[];
	export let settings: AppSettings;
</script>

<MultipleDataPointsCard title={$t('common.dailyForecast.title')} className="daily-weather-bg">
	{#each dailyForecast as { time, temperatureMax, weatherCode, precipitation, precipitationType }, index}
		<div class="flex-grow min-w-[100px] {index < dailyForecast.length ? 'mr-2' : ''}">
			<WeatherCardSmall
				timeMode="days"
				time={dayjs(time)}
				temperature={temperatureMax}
				{weatherCode}
				{precipitation}
				{precipitationType}
				{settings}
				weatherItem={dailyForecast[index]}
			/>
		</div>
	{/each}
</MultipleDataPointsCard>

<style global>
	.daily-weather-bg {
		background: radial-gradient(100% 141.32% at 0% 50%, #030aa5 0%, #3d3aca 56.77%, #0f5ebb 100%);
	}
</style>
