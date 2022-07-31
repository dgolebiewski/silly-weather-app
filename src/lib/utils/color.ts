export type RgbColor = [number, number, number];

const mixColorChannel = (a: number, b: number, blend: number) => {
	const aMix = a * blend;
	const bMix = b * (1 - blend);

	return aMix + bMix;
};

export const mixColors = (colorA: RgbColor, colorB: RgbColor, blend: number): RgbColor => {
	const r = mixColorChannel(colorA[0], colorB[0], blend);
	const g = mixColorChannel(colorA[1], colorB[1], blend);
	const b = mixColorChannel(colorA[2], colorB[2], blend);

	return [r, g, b];
};

export const rgbColorToCssValue = (color: RgbColor): string => {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};
