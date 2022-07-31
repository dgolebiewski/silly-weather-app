<script lang="ts">
	import { getWeatherIcon } from '$lib/utils/weatherIcon';

	export let isNight: boolean = false;
	export let weatherCode: number;

	$: icon = getWeatherIcon(weatherCode);
</script>

<i
	class="mi-{icon !== 'sun' || !isNight ? icon : 'moon'} text-3xl {isNight
		? 'text-gray-400'
		: 'text-yellow-500'}"
/>
