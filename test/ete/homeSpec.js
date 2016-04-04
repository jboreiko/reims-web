describe('REIMS web home', function() {
    beforeEach(function() {
	browser.get('/#/home');
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/home');	
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

});
