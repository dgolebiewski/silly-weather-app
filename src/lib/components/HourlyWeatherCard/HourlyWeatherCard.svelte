<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { t } from '$lib/i18n/translations';
	import MultipleDataPointsCard from '$lib/components/MultipleDataPointsCard/MultipleDataPointsCard.svelte';
	import SunriseAndSunset from '$lib/components/HourlyWeatherCard/SunriseAndSunset.svelte';
	import type { HourlyWeatherItem } from '$lib/utils/weatherItem';
	import WeatherCardSmall from '../WeatherCardSmall/WeatherCardSmall.svelte';
	import dayjs from 'dayjs';
	import type { AppSettings } from '$lib/utils/settings';

	export let sunrise: Dayjs;
	export let sunset: Dayjs;
	export let tomorrowSunrise: Dayjs;
	export let hourlyForecast: HourlyWeatherItem[];
	export let settings: AppSettings;
</script>

<MultipleDataPointsCard title={$t('common.hourlyForecast.title')} className="hourly-weather-bg">
	<SunriseAndSunset slot="secondaryContent" {sunrise} {sunset} />
	{#each hourlyForecast as { time, temperature, weatherCode, precipitation, precipitationType }, index}
		<div class="flex-grow min-w-[100px] {index < hourlyForecast.length ? 'mr-2' : ''}">
			<WeatherCardSmall
				time={dayjs(time)}
				isNight={dayjs(time).isAfter(sunset) && dayjs(time).isBefore(tomorrowSunrise)}
				{temperature}
				{weatherCode}
				{precipitation}
				{precipitationType}
				{settings}
			/>
		</div>
	{/each}
</MultipleDataPointsCard>

<style global>
	.hourly-weather-bg {
		background: radial-gradient(100% 141.32% at 0% 50%, #00e0ff 0%, #7544ff 56.77%, #7000ff 100%);
	}
</style>
