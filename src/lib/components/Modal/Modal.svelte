<script lang="ts">
	import Portal from 'svelte-portal';
	import { browser } from '$app/env';
	import { fade } from 'svelte/transition';
	import { clickOutside } from 'svelte-use-click-outside';
	import Button from '$lib/components/Input/Button.svelte';

	export let open: boolean = false;
	export let dark: boolean = false;
</script>

{#if browser}
	<Portal target={document.body}>
		{#if open}
			<div
				class="fixed top-0 left-0 w-full h-full pt-16 px-2 flex justify-center items-start bg-black/40 z-50"
				transition:fade={{ duration: 200 }}
			>
				<div
					class="rounded-lg w-128 {dark ? 'bg-slate-700' : 'bg-slate-200'}"
					use:clickOutside={() => (open = false)}
				>
					<div
						class="px-3 py-4 border-b flex justify-between items-center {dark
							? 'border-b-slate-400'
							: 'border-b-slate-300'}"
					>
						<h3><slot name="header" /></h3>
						<Button size="small" on:click={() => (open = false)}>
							<i class="mi-close" />
						</Button>
					</div>
					<div class="px-3 py-4">
						<slot />
					</div>
					<div class="px-3 py-4 border-t {dark ? 'border-t-slate-400' : 'border-t-slate-300'}">
						<slot name="footer" />
					</div>
				</div>
			</div>
		{/if}
	</Portal>
{/if}
