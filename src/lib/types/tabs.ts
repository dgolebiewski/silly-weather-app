import type { ComponentType } from 'svelte';

export type Tab = {
	title: string;
	component: ComponentType;
	componentProps?: Record<string, any>;
};
