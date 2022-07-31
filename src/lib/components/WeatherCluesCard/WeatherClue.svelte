<script lang="ts">
	import type { FinalWeatherClue } from '$lib/utils/weatherClues';
	import { t } from '$lib/i18n/translations';

	export let clue: FinalWeatherClue;

	$: ({ icon, time, labelCode } = clue);
</script>

<div class="flex justify-between items-center py-3 border-b-2 border-b-white border-opacity-20">
	<p class="font-bold opacity-60 md:text-xl w-1/3">
		<i class="mi-{icon} mr-1" />
		{time.format('HH:mm')}
	</p>
	<p class="font-bold md:text-lg text-right w-2/3">
		{$t(`common.weatherClues.hourly.${labelCode}`)}
	</p>
</div>
