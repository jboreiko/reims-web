exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['loginSpec.js', 'homeSpec.js'],
    framework: 'jasmine2',
    rootElement: 'html',
    multiCapabilities: [{
	browserName: 'firefox'
    }, {
	browserName: 'chrome'
    }]
};
