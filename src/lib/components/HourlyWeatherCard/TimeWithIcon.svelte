<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { t } from '$lib/i18n/translations';
	import { tippy } from '$lib/actions/tippy';

	export let iconClass: string | null = null;
	export let icon: string;
	export let time: Dayjs;
	export let labelCode: string;
</script>

<div class="flex items-center cursor-help" use:tippy={{ content: $t(labelCode) }}>
	<i class="mi-{icon} text-4xl md:text-6xl mr-2 {iconClass || ''}" />
	<p class="font-bold text-2xl md:text-3xl">
		{time.format('HH:mm')}
	</p>
</div>
