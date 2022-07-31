export const uvIndexFromShortwaveRadiation = (shortwaveRadiation: number, weatherCode: number) => {
	let multiplier = 1;
	switch (weatherCode) {
		case 0:
			multiplier = 1;
			break;
		case 1:
			multiplier = 0.89;
			break;
		case 2:
			multiplier = 0.73;
			break;
		default:
			multiplier = 0.31;
	}

	return Math.round((shortwaveRadiation * multiplier) / 25);
};
