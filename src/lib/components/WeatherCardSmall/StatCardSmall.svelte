<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import { tippy } from '$lib/actions/tippy';

	export let labelCode: string;
	export let icon: string;
	export let value: string | number;
	export let unit: string | null;
</script>

<div
	class="flex justify-center items-center text-white cursor-help"
	use:tippy={{ content: $t(`common.weatherStat.${labelCode}.default`) }}
>
	<i class="mi-{icon} mr-1" />
	<p class="font-bold">{value}</p>
	{#if unit}
		<p class="font-bold text-xs leading-6 opacity-60 flex">{$t(`common.units.${unit}`)}</p>
	{/if}
</div>
