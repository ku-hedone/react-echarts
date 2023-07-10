export interface ImageOptions {
	type?: 'png' | 'jpeg' | 'svg';
	title: string;
	excludeComponents?: string[];
	pixelRatio?: number;
}
