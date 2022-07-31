<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import dayjs from '$lib/utils/dayjs';
	import Temperature from '$lib/components/Temperature.svelte';
	import Time from '$lib/components/WeatherCard/Time.svelte';
	import StatCard from '$lib/components/WeatherCard/StatCard.svelte';
	import type { WeatherStat } from '$lib/utils/weatherStats';
	import { getWeatherAlert } from '$lib/utils/weatherAlerts';
	import Card from '../Card.svelte';
	import WeatherIcon from './WeatherIcon.svelte';

	export let time: dayjs.Dayjs = dayjs();
	export let isWholeDay = false;
	export let isNight = false;
	export let weatherCode: number;
	export let temperature: number;
	export let stats: WeatherStat[] = [];
	export let city: string;

	$: weatherAlert = getWeatherAlert(weatherCode);
</script>

<Card
	className="relative flex flex-col justify-between {isNight
		? 'weather-card-night'
		: 'weather-card-day'}"
>
	<Time {time} {isWholeDay} />

	<div class="flex flex-col justify-center items-center">
		<WeatherIcon {weatherCode} {isNight} />
		<Temperature value={temperature} />
		<p class="font-bold mb-2">{city}</p>
		{#if weatherAlert}
			<p
				class="font-bold {weatherAlert.type === 'warning'
					? 'text-yellow-500'
					: 'text-red-400'} opacity-70 text-sm"
			>
				<i class="mi-warning mr-1" />
				{$t(`common.weatherAlerts.${weatherAlert.messageCode}`)}
			</p>
		{/if}
	</div>

	<div class="flex items-center justify-between">
		{#each stats as stat}
			<div class="w-1/3">
				<StatCard icon={stat.icon} label={stat.labelCode} value={stat.value} unit={stat.unit} />
			</div>
		{/each}
	</div>
</Card>

<style global>
	.weather-card-day {
		background: radial-gradient(
			104.38% 104.38% at 50% 95.47%,
			#56c1fe 0%,
			#009ef6 56.77%,
			#00b2ff 67.71%,
			#00b2ff 100%
		);
	}

	.weather-card-night {
		background: radial-gradient(
			104.38% 104.38% at 50% 95.47%,
			#1e2636 0%,
			#1e2636 56.77%,
			#121617 67.71%,
			#212729 100%
		);
	}
</style>
