exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['login-spec.js'],
    framework: 'jasmine2',
    capabilities: {
	browserName: 'chrome'
    }
};
