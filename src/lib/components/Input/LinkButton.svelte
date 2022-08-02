<script lang="ts">
	export let href: string = '#';
	export let dark: boolean = false;
</script>

<a
	class="inline-block px-2 py-1 rounded-md transition-colors {dark
		? 'text-white hover:bg-slate-200/20'
		: 'text-black hover:bg-slate-500/20'}"
	{href}
>
	<slot />
</a>
