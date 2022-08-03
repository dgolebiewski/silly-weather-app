<script lang="ts">
	import {
		type AppSettings,
		UNITS_OPTIONS,
		type CommonUnit,
		TEMPERATURE_UNIT_OPTIONS,
		type TemperatureUnit,
		type WindspeedUnit,
		type PrecipitationUnit,
		WINDSPEED_UNIT_OPTIONS,
		PRECIPITATION_UNIT_OPTIONS,
		getCommonUnitsValue
	} from '$lib/utils/settings';
	import { t } from '$lib/i18n/translations';
	import FormRow from '../Input/FormRow.svelte';
	import SelectInput from '../Input/SelectInput.svelte';
	import { tick } from 'svelte';
	import SaveButton from './SaveButton.svelte';

	export let settings: AppSettings;

	let units: CommonUnit = getCommonUnitsValue(settings);
	let temperatureUnit: TemperatureUnit = settings.temperatureUnit;
	let windspeedUnit: WindspeedUnit = settings.windspeedUnit;
	let precipitationUnit: PrecipitationUnit = settings.precipitationUnit;

	const handleUnitsChange = (u: CommonUnit) => {
		if (u === 'custom') {
			return;
		}

		switch (u) {
			case 'metric':
				temperatureUnit = 'celsius';
				windspeedUnit = 'kmh';
				precipitationUnit = 'mm';
				break;
			case 'imperial':
				temperatureUnit = 'fahrenheit';
				windspeedUnit = 'mph';
				precipitationUnit = 'inch';
				break;
		}
	};

	const checkCommonUnits = async () => {
		await tick();
		units = getCommonUnitsValue(settings);
	};

	$: handleUnitsChange(units);
	$: {
		settings = {
			...settings,
			temperatureUnit,
			windspeedUnit,
			precipitationUnit
		};

		checkCommonUnits();
	}
</script>

<FormRow label={$t('settings.units.units')} inputId="units">
	<SelectInput
		id="units"
		translationBase="settings.units"
		options={UNITS_OPTIONS}
		bind:value={units}
	/>
</FormRow>
<FormRow label={$t('settings.units.temperatureUnit')} inputId="temperatureUnit">
	<SelectInput
		id="temperatureUnits"
		translationBase="settings.units"
		options={TEMPERATURE_UNIT_OPTIONS}
		bind:value={temperatureUnit}
	/>
</FormRow>
<FormRow label={$t('settings.units.windspeedUnit')} inputId="windspeedUnit">
	<SelectInput
		id="windspeedUnit"
		translationBase="settings.units"
		options={WINDSPEED_UNIT_OPTIONS}
		bind:value={windspeedUnit}
	/>
</FormRow>
<FormRow label={$t('settings.units.precipitationUnit')} inputId="precipitationUnit">
	<SelectInput
		id="precipitationUnit"
		translationBase="settings.units"
		options={PRECIPITATION_UNIT_OPTIONS}
		bind:value={precipitationUnit}
	/>
</FormRow>

<SaveButton {settings} />
