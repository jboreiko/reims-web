describe('REIMS web home', function() {
    var baseUrl = 'http://localhost:3000';

    beforeEach(function() {
	browser.get(baseUrl);
    });
    
    it('should direct to home', function() {
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/home');
    });

    it('should link to home', function() {
	element(by.id('homeTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/home');
    });

    it('should link to search', function() {
	element(by.id('searchTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/search');
    });

    it('should link to add', function() {
	element(by.id('addTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/add');
    });

    it('should link to help', function() {
	element(by.id('helpTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/help');
    });

    it('should link to sync', function() {
	element(by.id('syncTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/sync');
    });
});
