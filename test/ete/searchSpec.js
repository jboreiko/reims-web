describe('REIMS web search', function() {
    var baseUrl = 'http://localhost:3000';

    beforeEach(function() {
	browser.get(baseUrl + '/#/search');
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/search');
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

});
