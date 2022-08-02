<script lang="ts">
	import { browser } from '$app/env';
	import { t } from '$lib/i18n/translations';
	import type { LatLng, LocationInfo } from '$lib/utils/common';
	import type { WeatherForecast } from '$lib/utils/openMeteoForecastApi';
	import WeatherCard from '$lib/components/WeatherCard/WeatherCard.svelte';
	import dayjs, { ONE_HOUR } from '$lib/utils/dayjs';
	import { invalidate } from '$app/navigation';
	import { getMostRelevantStats } from '$lib/utils/weatherStats';
	import StatCard from '$lib/components/StatCard/StatCard.svelte';
	import { getWeatherPoints } from '$lib/utils/homepage';
	import Header from '$lib/components/Header.svelte';
	import HourlyWeatherCard from '$lib/components/HourlyWeatherCard/HourlyWeatherCard.svelte';
	import DailyWeatherCard from '$lib/components/DailyWeatherCard/DailyWeatherCard.svelte';
	import { isNight as checkIsNight } from '$lib/utils/night';
	import WeatherCluesCard from '$lib/components/WeatherCluesCard/WeatherCluesCard.svelte';
	import type { AppSettings } from '$lib/utils/settings';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, onDestroy } from 'svelte';

	export let latLng: LatLng;
	export let locationInfo: LocationInfo;
	export let forecast: WeatherForecast;
	export let settings: AppSettings;

	let invalidateRouteRoutine: number | NodeJS.Timer | null = null;

	$: weatherCards = getWeatherPoints(forecast.hourlyForecast, forecast.dailyForecast, settings);
	$: currentWeather = forecast.currentWeather;
	$: currentWeatherStats = currentWeather
		? getMostRelevantStats(currentWeather, settings, 3, 3)
		: null;
	$: todayForecast = forecast.todayForecast;
	$: tomorrowForecast = forecast.tomorrowForecast;
	$: hourlyForecast = forecast.hourlyForecast.filter(
		(item) =>
			dayjs(item.time).isAfter(dayjs().tz('UTC')) &&
			dayjs(item.time).isBefore(dayjs().tz('UTC').add(24, 'hours'))
	);
	$: dailyForecast = forecast.dailyForecast.filter((item) =>
		dayjs(item.time).isAfter(dayjs().tz('UTC'))
	);

	$: isNight =
		todayForecast && tomorrowForecast ? checkIsNight(todayForecast, tomorrowForecast) : false;

	onMount(() => {
		invalidateRouteRoutine = setInterval(() => {
			invalidate('/');
		}, ONE_HOUR / 2);
	});

	onDestroy(() => {
		if (!invalidateRouteRoutine) return;

		clearInterval(invalidateRouteRoutine);
	});
</script>

<svelte:head>
	<title
		>{browser && currentWeather && tomorrowForecast
			? `${currentWeather.temperature}° now | ${tomorrowForecast.temperatureMax} tomorrow | ${$t(
					'common.title'
			  )}`
			: $t('common.title')}</title
	>
</svelte:head>

<div class={isNight ? 'bg-slate-700' : 'bg-sky-200'}>
	<div class="xl:container mx-auto px-4 py-6">
		<Header {latLng} {isNight} {locationInfo} {settings} />
		{#if weatherCards}
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<WeatherCard city={locationInfo.city} {...weatherCards[0]} />
				<WeatherCard city={locationInfo.city} {...weatherCards[1]} />

				{#if currentWeatherStats}
					<div class="md:col-span-2 xl:col-span-1">
						<StatCard stats={currentWeatherStats.secondaryStats} />
					</div>
				{/if}

				{#if todayForecast && tomorrowForecast}
					<div class="md:col-span-2">
						<HourlyWeatherCard
							sunrise={dayjs(todayForecast.sunrise)}
							sunset={dayjs(todayForecast.sunset)}
							tomorrowSunrise={dayjs(tomorrowForecast.sunrise)}
							{hourlyForecast}
							{settings}
						/>
					</div>
				{/if}

				<WeatherCard city={locationInfo.city} {...weatherCards[2]} />

				<WeatherCluesCard {hourlyForecast} />

				<div class="md:col-span-2">
					<DailyWeatherCard {dailyForecast} {settings} />
				</div>
			</div>
		{:else}
			<p class="text-center">{$t('common.error.weatherInfo')}</p>
		{/if}
	</div>

	<Footer dark={isNight} />
</div>
