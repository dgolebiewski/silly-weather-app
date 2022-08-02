<script lang="ts">
	import { t, locales } from '$lib/i18n/translations';
	import type { AppSettings } from '$lib/utils/settings';
	import FormRow from '../Input/FormRow.svelte';
	import SelectInput from '../Input/SelectInput.svelte';
	import SaveButton from './SaveButton.svelte';

	export let settings: AppSettings;

	let language = settings.language;

	$: {
		settings = {
			...settings,
			language
		};
	}
</script>

<FormRow label={$t('settings.general.languageTitle')} inputId="language">
	<SelectInput
		id="language"
		translationBase="settings.general.language"
		options={locales.get()}
		bind:value={language}
	/>
</FormRow>

<SaveButton {settings} />
