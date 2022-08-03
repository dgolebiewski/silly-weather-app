<script lang="ts">
	import { invalidate } from '$app/navigation';

	import { t, locale } from '$lib/i18n/translations';
	import type { AppSettings } from '$lib/utils/settings';
	import { onMount } from 'svelte';
	import Button from '../Input/Button.svelte';
	import Spinner from '../Spinner.svelte';

	export let settings: AppSettings;

	let initialSettings: string;
	let dirty = false;
	let isSaving = false;

	const saveSettings = async () => {
		isSaving = true;

		const response = await fetch('/settings', {
			method: 'POST',
			body: JSON.stringify(settings)
		});

		if (response.status === 200) {
			initialSettings = JSON.stringify(settings);
			dirty = false;

			if (settings.language !== locale.get()) {
				locale.set(settings.language);
			}

			await invalidate('/');
			await invalidate('/settings');
		} else {
			settings = JSON.parse(initialSettings);
		}

		isSaving = false;
	};

	$: {
		if (initialSettings && !dirty && JSON.stringify(settings) !== initialSettings) {
			dirty = true;
		}
	}

	onMount(() => {
		initialSettings = JSON.stringify(settings);
	});
</script>

<div class="flex items-center justify-end mt-8">
	{#if isSaving}
		<Spinner />
	{/if}
	<Button variant="primary" disabled={!dirty || isSaving} on:click={saveSettings}>
		{$t('settings.save')}
	</Button>
</div>
