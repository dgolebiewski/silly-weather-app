<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/env';

	type ScrollPosition = {
		left: number;
		top: number;
		x: number;
		y: number;
	};

	type Vector2 = {
		x: number;
		y: number;
	};

	const STOP_THRESHOLD = 0.5;
	const VELOCITY_DELTA_TIME = 10;
	const VELOCITY_MULTIPLIER = 0.1;
	const MAX_VELOCITY = 20;

	export let velocityDropoff = 0.75;
	export let disabled = false;

	let container: HTMLDivElement;
	let initialPos: ScrollPosition;
	let lastMousePos: Vector2;
	let velocity: Vector2;
	let captureVelocity = true;
	let carryMomentumInterval: number | NodeJS.Timer | null;
	let resetCaptureVelocityInterval: number | NodeJS.Timer | null;

	const carryMomentum = () => {
		if (!container) return;

		if (!velocity || (velocity.x === 0 && velocity.y === 0)) {
			if (carryMomentumInterval) {
				clearInterval(carryMomentumInterval);
				carryMomentumInterval = null;
			}
			return;
		}

		velocity = {
			x: velocity.x * (1 - velocityDropoff * (VELOCITY_DELTA_TIME / 1000)),
			y: velocity.y * (1 - velocityDropoff * (VELOCITY_DELTA_TIME / 1000))
		};

		container.scrollTop = container.scrollTop - velocity.y;
		container.scrollLeft = container.scrollLeft - velocity.x;

		if (Math.abs(velocity.x) <= STOP_THRESHOLD) {
			velocity.x = 0;
		}

		if (Math.abs(velocity.y) <= STOP_THRESHOLD) {
			velocity.y = 0;
		}
	};

	const handleMouseUp = (e: MouseEvent) => {
		if (!container || disabled) return;

		container.style.removeProperty('cursor');

		carryMomentumInterval = setInterval(carryMomentum, VELOCITY_DELTA_TIME);

		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);

		if (resetCaptureVelocityInterval) {
			clearInterval(resetCaptureVelocityInterval);
			resetCaptureVelocityInterval = null;
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!initialPos || !container || disabled) return;

		const dx = e.clientX - initialPos.x;
		const dy = e.clientY - initialPos.y;

		container.scrollTop = initialPos.top - dy;
		container.scrollLeft = initialPos.left - dx;

		if (captureVelocity) {
			if (lastMousePos) {
				velocity = {
					x: Math.min((e.clientX - lastMousePos.x) * VELOCITY_MULTIPLIER, MAX_VELOCITY),
					y: Math.min((e.clientY - lastMousePos.y) * VELOCITY_MULTIPLIER, MAX_VELOCITY)
				};
			}

			lastMousePos = {
				x: e.clientX,
				y: e.clientY
			};

			captureVelocity = false;
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		if (!container || disabled) return;

		container.style.cursor = 'grabbing';

		initialPos = {
			left: container.scrollLeft,
			top: container.scrollTop,
			x: e.clientX,
			y: e.clientY
		};

		velocity = {
			x: 0,
			y: 0
		};

		if (carryMomentumInterval) {
			clearInterval(carryMomentumInterval);
			carryMomentumInterval = null;
		}

		resetCaptureVelocityInterval = setInterval(() => {
			captureVelocity = true;
		}, VELOCITY_DELTA_TIME);

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	onMount(() => {
		if (!browser) {
			return;
		}

		container.addEventListener('mousedown', handleMouseDown);
	});

	onDestroy(() => {
		if (!browser) {
			return;
		}

		container.removeEventListener('mousedown', handleMouseDown);
	});

	$: {
		if (disabled) {
			velocity = {
				x: 0,
				y: 0
			};
		}
	}
</script>

<div
	class="flex items-center w-full max-w-full {disabled
		? 'overflow-hidden'
		: 'overflow-x-auto'} no-scrollbar select-none cursor-grab"
	bind:this={container}
>
	<slot />
</div>
