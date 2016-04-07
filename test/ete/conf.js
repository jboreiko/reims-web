var targetHost = (process.env.TARGET_HOST !== undefined) ? process.env.TARGET_HOST : "localhost";
    
exports.config = {
    seleniumAddress: 'http://' + targetHost + ':4444/wd/hub',
    specs: ['loginSpec.js',
	    'navBarSpec.js',
	    'homeSpec.js',
	    'searchSpec.js'],
    framework: 'jasmine2',
    rootElement: 'html',
    baseUrl: 'http://' + targetHost + ':3000',
    capabilities: {
	browserName: 'chrome'
    }
};
