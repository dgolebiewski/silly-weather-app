<script lang="ts">
	type TemperatureSize = 'small' | 'large';

	export let value: number;
	export let size: TemperatureSize = 'large';

	$: temperature = Math.round(value);
</script>

<h2 class="flex items-start {size === 'large' ? 'mr-[-13px]' : 'mr-[-6px]'}">
	<span class="font-bold {size === 'large' ? 'text-6xl' : 'text-3xl'} leading-tight">
		{temperature}
	</span>
	<span class="font-bold {size === 'large' ? 'text-3xl' : 'text-base'} opacity-60">&deg;</span>
</h2>
