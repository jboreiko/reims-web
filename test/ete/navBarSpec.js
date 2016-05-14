describe('REIMS web home', function() {
    beforeEach(function() {
	browser.get('/');
    });
    
    it('should direct to home', function() {
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/home');
    });

    it('should link to home', function() {
	element(by.id('homeTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/home');
    });

    it('should link to search', function() {
	element(by.id('searchTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/search');
    });

    it('should link to add', function() {
	element(by.id('addTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/add');
    });

    it('should link to help', function() {
	element(by.id('helpTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/help');
    });

    it('should link to sync', function() {
	element(by.id('syncTab')).click();
	browser.refresh();
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/sync');
    });
});
