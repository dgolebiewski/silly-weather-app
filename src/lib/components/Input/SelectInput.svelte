<script lang="ts">
	import { COMMON_INPUT_CLASSES } from '$lib/utils/input';
	import { t } from '$lib/i18n/translations';

	export let id: string;
	export let translationBase: string = 'common';
	export let options: string[];
	export let value: string;
</script>

<select {id} class={COMMON_INPUT_CLASSES} bind:value>
	{#each options as option}
		<option value={option}>{$t(`${translationBase}.${option}`)}</option>
	{/each}
</select>
