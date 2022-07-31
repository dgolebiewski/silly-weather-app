export const hasRequiredQueryParams = (
	queryParams: URLSearchParams,
	requiredKeys: string[]
): boolean => {
	for (let i = 0; i < requiredKeys.length; i++) {
		if (!queryParams.has(requiredKeys[i])) {
			return false;
		}
	}

	return true;
};
