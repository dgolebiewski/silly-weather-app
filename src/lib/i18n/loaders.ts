export type LoaderKey = {
	key: string;
	routes: string[];
};

export type LoaderKeys = LoaderKey[] | string[];

const isLoaderKey = (key: LoaderKey | string): key is LoaderKey => {
	return typeof key !== 'string';
};

export const createLoaders = (locale: string, keys: LoaderKeys) => {
	return keys.map((key) => {
		if (isLoaderKey(key)) {
			return {
				locale,
				key: key.key,
				routes: key.routes,
				loader: async () => (await import(`./${locale}/${key.key}.json`)).default
			};
		}

		return {
			locale,
			key,
			loader: async () => (await import(`./${locale}/${key}.json`)).default
		};
	});
};
