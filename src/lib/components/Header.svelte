<script lang="ts">
	import { t } from '$lib/i18n/translations';

	export let isNight: boolean = false;
</script>

<div class="py-6 w-full mb-6 relative" class:text-white={isNight}>
	<h1 class="text-6xl text-center font-bold w-full max-w-xl mx-auto mb-4">{$t('common.title')}</h1>
	<div class="absolute top-2 right-2 xl:top-8 xl:right-8">
		<slot />
	</div>
</div>
