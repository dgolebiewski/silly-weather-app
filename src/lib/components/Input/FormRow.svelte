<script lang="ts">
	export let label: string;
	export let inputId: string;
</script>

<div class="flex justify-between items-center mb-2">
	<label for={inputId}>
		{label}
	</label>
	<slot />
</div>
