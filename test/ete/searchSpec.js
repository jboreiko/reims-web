describe('REIMS web search', function() {
    beforeEach(function() {
	browser.get('/#/search');
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/search');
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

});
