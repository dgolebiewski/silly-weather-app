<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import Modal from './Modal/Modal.svelte';
	import TextButton from './Input/TextButton.svelte';

	export let dark: boolean = false;

	let notesOpen: boolean = false;
</script>

<div
	class="flex justify-between items-center p-4 text-xs {dark
		? 'bg-white/20 text-white'
		: 'bg-blue-500/40'}"
>
	<p class="opacity-60">
		{$t('common.footer.author')}
	</p>

	<TextButton on:click={() => (notesOpen = true)} variant={dark ? 'dark' : 'light'}>
		{$t('common.footer.notes')}
	</TextButton>
</div>

<Modal bind:open={notesOpen}>
	<span slot="header">notes</span>
	<p>
		uses <a
			class="text-blue-500 hover:text-blue-400"
			target="_blank"
			href="https://www.figma.com/community/file/1063214752157488449"
			>glassmorphism - weather icon</a
		> by osman talha
	</p>
	<p>
		uses <a
			class="text-blue-500 hover:text-blue-400"
			target="_blank"
			href="https://icons.mono.company/">mono icons</a
		> by mono company
	</p>
</Modal>
