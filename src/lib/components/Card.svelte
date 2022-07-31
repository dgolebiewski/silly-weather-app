<script lang="ts">
	export let className: string = '';
</script>

<div class="rounded-2xl shadow-md h-96 w-full px-5 pt-4 pb-6 text-white {className}">
	<slot />
</div>
