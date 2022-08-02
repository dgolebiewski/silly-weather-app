import tippyJS, { type Instance } from 'tippy.js';

type UseTippyParameters = {
	content: string;
};

export const tippy = (
	node: HTMLElement,
	parameters: UseTippyParameters
): SvelteActionReturnType => {
	let instance: Instance | null = tippyJS(node, {
		content: parameters.content
	});

	return {
		update(args: UseTippyParameters) {
			if (!instance) {
				return;
			}

			instance.setContent(args.content);
		},
		destroy() {
			if (!instance) {
				return;
			}

			instance.destroy();
			instance = null;
		}
	};
};
