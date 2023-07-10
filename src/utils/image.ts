import type { ECharts } from 'echarts/core';
import type { ImageOptions } from '../types/image';

export const saveAsImage = (instance: ECharts, options: ImageOptions) => {
	const rendererType = instance.getZr().painter.getType();
	const { type = 'png' } = options;

	if (type === 'svg' && rendererType !== 'svg') {
		throw new Error('Svg image can only export when type of renderer is svg');
	}
	const { excludeComponents = ['toolbox'], pixelRatio = 1, title } = options;
	const url = instance.getConnectedDataURL({
		type,
		backgroundColor: instance.getOption().backgroundColor || '#fff',
		excludeComponents,
		pixelRatio,
	});

	if (typeof MouseEvent === 'function') {
		const aTag = document.createElement('a');
		aTag.download = `${title}.${type}`;
		aTag.target = '_blank';
		aTag.href = url;
		const event = new MouseEvent('click', {
			// some micro front-end framework， window maybe is a Proxy
			view: document.defaultView,
			bubbles: true,
			cancelable: false,
		});
		aTag.dispatchEvent(event);
	} else {
		const navigator = window.navigator as Navigator & {
			msSaveOrOpenBlob?: (blob: Blob, defaultName: string) => boolean;
		};
		const isSvg = rendererType === 'svg';
		if (navigator.msSaveOrOpenBlob || isSvg) {
			const parts = url.split(',');
			// data:[<mime type>][;charset=<charset>][;base64],<encoded data>
			const base64Encoded = parts[0].indexOf('base64') > -1;
			let bufferStr = isSvg
				? // should decode the svg data uri first
				  decodeURIComponent(parts[1])
				: parts[1];
			// only `atob` when the data uri is encoded with base64
			// otherwise, like `svg` data uri exported by zrender,
			// there will be an error, for it's not encoded with base64.
			// (just a url-encoded string through `encodeURIComponent`)
			if (base64Encoded) {
				bufferStr = window.atob(bufferStr);
			}
			const filename = title + '.' + type;
			if (navigator.msSaveOrOpenBlob) {
				let n = bufferStr.length;
				const u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bufferStr.charCodeAt(n);
				}
				const blob = new Blob([u8arr]);
				navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				const frame = document.createElement('iframe');
				document.body.appendChild(frame);
				const { contentWindow } = frame;
				if (contentWindow) {
					const doc = contentWindow.document;
					doc.open('image/svg+xml', 'replace');
					doc.write(bufferStr);
					doc.close();
					contentWindow.focus();
					doc.execCommand('SaveAs', true, filename);
					document.body.removeChild(frame);
				}
			}
		} else {
			/**
			 * 不存在
			 */
			const html =
				'' +
				'<body style="margin:0;">' +
				'<img src="' +
				url +
				'" style="max-width:100%;" />' +
				'</body>';
			const tab = window.open();
			if (tab) {
				tab.document.write(html);
				tab.document.title = title;
			}
		}
	}
};