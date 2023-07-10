class Browser {
	isFirefox = false;
	isIE = false;
	isEdge = false;
	isModernEdge = false;
	version: string | undefined;
}

const detect = (ua: string) => {
	const browser = new Browser();

	const firefox = ua.match(/Firefox\/([\d.]+)/);
	const ie =
		ua.match(/MSIE\s([\d.]+)/) ||
		// IE 11 Trident/7.0; rv:11.0
		ua.match(/Trident\/.+?rv:(([\d.]+))/);
	const edge = ua.match(/Edge?\/([\d.]+)/); // IE 12 and 12+

	if (firefox) {
		browser.isFirefox = true;
		browser.version = firefox[1];
	}
	if (ie) {
		browser.isIE = true;
		browser.version = ie[1];
	}

	if (edge) {
		browser.isEdge = true;
		browser.version = edge[1];
		browser.isModernEdge = +edge[1].split('.')[0] > 18;
	}

	return browser;
};

export default detect;
