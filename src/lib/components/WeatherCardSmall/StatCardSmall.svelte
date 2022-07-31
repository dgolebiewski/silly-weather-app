<script lang="ts">
	export let icon: string;
	export let value: number;
	export let unit: string;
</script>

<div class="flex justify-center items-center text-white">
	<i class="mi-{icon} mr-1" />
	<p class="font-bold">{value}</p>
	<p class="font-bold text-xs leading-6 opacity-60 flex">{unit}</p>
</div>
