<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let progress: number = 0;
	export let infinite: boolean = false;

	const INFINITE_PROGRESS_STEP = 10;
	const INFINITE_PROGRESS_INTERVAL = 500;
	const INFINITE_PROGRESS_MAX = 95;

	let currentProgress = 0;
	let infiniteProgressInterval: number | NodeJS.Timer;

	const infiniteProgressTick = () => {
		currentProgress = Math.min(INFINITE_PROGRESS_MAX, currentProgress + INFINITE_PROGRESS_STEP);
	};

	onMount(() => {
		if (!infinite) {
			return;
		}

		infiniteProgressInterval = setInterval(() => {
			infiniteProgressTick();
		}, INFINITE_PROGRESS_INTERVAL);
	});

	onDestroy(() => {
		if (!infiniteProgressInterval) {
			return;
		}

		clearInterval(infiniteProgressInterval);
	});

	$: {
		if (!infinite) {
			currentProgress = progress;
		}
	}
</script>

<div class="fixed top-0 left-0 w-full">
	<div class="rounded-br-md h-1 bg-blue-500 transition-all" style:width={`${currentProgress}%`} />
</div>
