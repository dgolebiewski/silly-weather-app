<script lang="ts">
	import dayjs from '$lib/utils/dayjs';
	import { t } from '$lib/i18n/translations';
	import type { Dayjs } from 'dayjs';

	export let time: Dayjs = dayjs();
	export let isWholeDay = false;

	let timeString = '';
	let isTimeLabel = false;

	const isNightTime = (time: Dayjs) => {
		return (time.hour() > 22 && time.hour() <= 24) || time.hour() < 6;
	};

	$: {
		isTimeLabel = true;
		const now = dayjs();
		if (Math.abs(now.diff(time, 'h', true)) < 2 && !isWholeDay) {
			timeString = 'now';
		} else if (
			now.diff(time, 'h', true) > 12 &&
			now.diff(time, 'd', true) < 2 &&
			isNightTime(time) &&
			!isWholeDay
		) {
			timeString = 'tomorrowNight';
		} else if (!isWholeDay && isNightTime(time)) {
			timeString = 'night';
		} else if (time.isTomorrow() || time.hour() < 6) {
			timeString = 'tomorrow';
		} else {
			isTimeLabel = false;
			timeString = time.format('DD MMM');
		}
	}
</script>

<p class="font-medium absolute top-4 left-5">
	{isTimeLabel ? $t(`common.weatherCard.time.${timeString}`) : timeString}
</p>
