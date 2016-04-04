describe('REIMS web home', function() {
    var baseUrl = 'http://localhost:3000';

    beforeEach(function() {
	browser.get(baseUrl + '/#/home');
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/home');	
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

});
