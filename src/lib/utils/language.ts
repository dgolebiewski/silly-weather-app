export const getISO6391Language = () => {
	if (!navigator) {
		throw "'navigator' is not available. Are you sure you're running this function in the browser?";
	}

	if (!navigator.language) {
		console.warn('Could not detect current language.');
		return 'en';
	}

	return navigator.language.slice(0, 2);
};
