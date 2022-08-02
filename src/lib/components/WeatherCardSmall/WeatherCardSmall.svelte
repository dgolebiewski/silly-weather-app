<script lang="ts">
	import type { AppSettings } from '$lib/utils/settings';

	import type {
		DailyWeatherItem,
		HourlyWeatherItem,
		PrecipitationType
	} from '$lib/utils/weatherItem';
	import { getMostRelevantStats } from '$lib/utils/weatherStats';

	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import Temperature from '../Temperature.svelte';
	import StatCardSmall from './StatCardSmall.svelte';
	import WeatherIconSmall from './WeatherIconSmall.svelte';

	type TimeMode = 'days' | 'hours';

	const COLOR_DAY = '#00D1FF32';
	const COLOR_NIGHT = '#001C6532';

	export let time: Dayjs;
	export let isNight: boolean = false;
	export let timeMode: TimeMode = 'hours';
	export let temperature: number;
	export let weatherCode: number;
	export let precipitation: number;
	export let precipitationType: PrecipitationType;
	export let weatherItem: HourlyWeatherItem | DailyWeatherItem;
	export let settings: AppSettings;

	let precipitationIcon: string;

	$: backgroundColor = isNight ? COLOR_NIGHT : COLOR_DAY;
	$: formattedTime =
		timeMode === 'hours'
			? time.format('HH:mm')
			: dayjs().diff(time, 'days') < 7
			? time.format('ddd').toLowerCase()
			: time.format('MMM DD').toLowerCase();
	$: {
		if (precipitationType === 'rain' || precipitationType === 'showers') {
			precipitationIcon = 'rain';
		} else {
			precipitationIcon = 'snow';
		}
	}

	$: mostRelevantStat = getMostRelevantStats(weatherItem, settings, 1).primaryStats[0];
</script>

<div
	class="h-40 rounded-2xl shadow-sm flex flex-col justify-between items-center text-white pt-2 pb-3"
	style="background-color: {backgroundColor}"
>
	<div class="flex flex-col items-center justify-center">
		<p class="font-bold text-sm opacity-60 mb-2">
			{formattedTime}
		</p>
		<WeatherIconSmall {isNight} {weatherCode} />
		<Temperature size="small" value={temperature} />
	</div>
	<StatCardSmall
		labelCode={mostRelevantStat.labelCode}
		icon={mostRelevantStat.icon}
		value={mostRelevantStat.value}
		unit={mostRelevantStat.unit}
	/>
</div>
