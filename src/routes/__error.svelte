<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = ({ status }: LoadEvent) => {
		return {
			props: {
				status
			}
		};
	};
</script>

<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import Thunderstorm from '$lib/assets/Thunderstorm.svg';

	export let status: number;
</script>

<div class="flex flex-col justify-center items-center">
	<img class="w-64 h-auto" src={Thunderstorm} alt={$t('common.weatherIconAlt.thunderstorm')} />

	<h2 class="text-6xl">
		{status}
	</h2>

	<p class="text-3xl">
		{#if status === 404}
			{$t('common.error.404')}
		{:else}
			{$t('common.error.other')}
		{/if}
	</p>
</div>
