<script lang="ts">
	import { t } from '$lib/i18n/translations';

	import ClearDay from '$lib/assets/ClearDay.svg';
	import ClearNight from '$lib/assets/ClearNight.svg';
	import Cloudy from '$lib/assets/Cloudy.svg';
	import CloudyNight from '$lib/assets/CloudyNight.svg';
	import Overcast from '$lib/assets/Overcast.svg';
	import OvercastRain from '$lib/assets/OvercastRain.svg';
	import Rain from '$lib/assets/Rain.svg';
	import RainNight from '$lib/assets/RainNight.svg';
	import SlightlyCloudy from '$lib/assets/SlightlyCloudy.svg';
	import SlightlyCloudyNight from '$lib/assets/SlightlyCloudyNight.svg';
	import Thunderstorm from '$lib/assets/Thunderstorm.svg';

	export let weatherCode: number;
	export let isNight: boolean;

	type WeatherIconConditions = {
		weatherCodes: number[];
		night?: boolean;
		icon: string;
		alt: string;
	};

	// TODO: There is no icon for snow in this set
	const ICON_WEATHER_CODE_MAP: WeatherIconConditions[] = [
		{
			weatherCodes: [0],
			night: false,
			icon: ClearDay,
			alt: 'clearDay'
		},
		{
			weatherCodes: [0],
			night: true,
			icon: ClearNight,
			alt: 'clearNight'
		},
		{
			weatherCodes: [1],
			night: false,
			icon: SlightlyCloudy,
			alt: 'slightlyCloudy'
		},
		{
			weatherCodes: [1],
			night: true,
			icon: SlightlyCloudyNight,
			alt: 'slightlyCloudyNight'
		},
		{
			weatherCodes: [2],
			night: false,
			icon: Cloudy,
			alt: 'cloudy'
		},
		{
			weatherCodes: [2],
			night: true,
			icon: CloudyNight,
			alt: 'cloudyNight'
		},
		{
			weatherCodes: [3, 45, 48],
			icon: Overcast,
			alt: 'overcast'
		},
		{
			weatherCodes: [51, 53, 55],
			night: false,
			icon: Rain,
			alt: 'rain'
		},
		{
			weatherCodes: [51, 53, 55],
			night: true,
			icon: RainNight,
			alt: 'rainNight'
		},
		{
			weatherCodes: [56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 71, 73, 75, 77, 85, 86],
			icon: OvercastRain,
			alt: 'overcastRain'
		},
		{
			weatherCodes: [95, 96, 99],
			icon: Thunderstorm,
			alt: 'thunderstorm'
		}
	];

	const ICON_CLASSES = 'w-auto h-28';

	$: icon =
		ICON_WEATHER_CODE_MAP.find(
			(item) =>
				item.weatherCodes.includes(weatherCode) &&
				(typeof item.night === 'undefined' || item.night === isNight)
		) || ICON_WEATHER_CODE_MAP[0];
</script>

<!-- {#if [3, 45, 48].includes(weatherCode)}
	<img class={ICON_CLASSES} src={Overcast} alt={$t('common.weatherIconAlt.overcast')} />
{:else if [56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 71, 73, 75, 77, 85, 86].includes(weatherCode)}
	<img class={ICON_CLASSES} src={OvercastRain} alt={$t('common.weatherIconAlt.overcastRain')} />
{:else if [95, 96, 99].includes(weatherCode)}
	<img class={ICON_CLASSES} src={Thunderstorm} alt={$t('common.weatherIconAlt.thunderstorm')} />
{:else if isNight}
	{#if weatherCode === 0}
		<img class={ICON_CLASSES} src={ClearNight} alt={$t('common.weatherIconAlt.clearNight')} />
	{:else if weatherCode === 1}
		<img
			class={ICON_CLASSES}
			src={SlightlyCloudyNight}
			alt={$t('common.weatherIconAlt.slightlyCloudyNight')}
		/>
	{:else if weatherCode === 2}
		<img class={ICON_CLASSES} src={CloudyNight} alt={$t('common.weatherIconAlt.cloudyNight')} />
	{:else if [51, 53, 55].includes(weatherCode)}
		<img class={ICON_CLASSES} src={RainNight} alt={$t('common.weatherIconAlt.rainNight')} />
	{/if}
{:else if weatherCode === 0}
	<img class={ICON_CLASSES} src={ClearDay} alt={$t('common.weatherIconAlt.clearDay')} />
{:else if weatherCode === 1}
	<img class={ICON_CLASSES} src={SlightlyCloudy} alt={$t('common.weatherIconAlt.slightlyCloudy')} />
{:else if weatherCode === 2}
	<img class={ICON_CLASSES} src={Cloudy} alt={$t('common.weatherIconAlt.cloudy')} />
{:else if [51, 53, 55].includes(weatherCode)}
	<img class={ICON_CLASSES} src={Rain} alt={$t('common.weatherIconAlt.rain')} />
{/if} -->
<img class="w-auto h-28" src={icon.icon} alt={$t(`common.weatherIconAlt.${icon.alt}`)} />
