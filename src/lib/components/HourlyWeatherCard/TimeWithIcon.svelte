<script lang="ts">
	import type { Dayjs } from 'dayjs';

	export let iconClass: string | null = null;
	export let icon: string;
	export let time: Dayjs;
</script>

<div class="flex items-center">
	<i class="mi-{icon} text-4xl md:text-6xl mr-2 {iconClass || ''}" />
	<p class="font-bold text-2xl md:text-3xl">
		{time.format('HH:mm')}
	</p>
</div>
