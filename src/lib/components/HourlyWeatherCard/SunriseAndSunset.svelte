<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import TimeWithIcon from '$lib/components/HourlyWeatherCard/TimeWithIcon.svelte';

	export let sunrise: Dayjs;
	export let sunset: Dayjs;
</script>

<div class="flex items-center">
	<TimeWithIcon
		icon="sunrise"
		iconClass="text-yellow-300"
		time={sunrise}
		labelCode="common.hourlyForecast.sunrise"
	/>
	<div class="w-8" />
	<TimeWithIcon
		icon="sunset"
		iconClass="text-orange-500"
		time={sunset}
		labelCode="common.hourlyForecast.sunset"
	/>
</div>
