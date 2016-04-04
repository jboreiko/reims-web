exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['loginSpec.js',
	    'navBarSpec.js',
	    'homeSpec.js',
	    'searchSpec.js'],
    framework: 'jasmine2',
    rootElement: 'html',
    baseUrl: 'http://192.168.99.100:3000',
    capabilities: {
	browserName: 'chrome'
    }
};
