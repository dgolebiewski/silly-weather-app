<script lang="ts">
	import type { AppSettings } from '$lib/utils/settings';
	import { invalidate } from '$app/navigation';

	import { t } from '$lib/i18n/translations';
	import Button from '$lib/components/Input/Button.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import Controls from './UnitsControls.svelte';

	let open: boolean = false;
	let isSaving: boolean = false;

	export let settings: AppSettings;

	const saveSettings = async () => {
		if (isSaving) {
			return;
		}

		isSaving = true;
		const response = await fetch('/settings', {
			method: 'POST',
			body: JSON.stringify(settings)
		});

		if (response.status === 200) {
			invalidate('/');
		}

		isSaving = false;
		open = false;
	};
</script>

<Button size="small" on:click={() => (open = true)}>
	<i class="mi-settings" />
</Button>

<Modal bind:open>
	<span slot="header">{$t('common.settings.title')}</span>
	<Controls bind:settings />
	<div slot="footer">
		<Button on:click={saveSettings} variant="primary">{$t('common.settings.save')}</Button>
		<Button on:click={() => (open = false)}>{$t('common.settings.cancel')}</Button>
	</div>
</Modal>
