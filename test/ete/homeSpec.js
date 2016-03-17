describe('REIMS web home', function() {
    var baseUrl = 'http://localhost:3000';

    beforeEach(function() {
	browser.get(baseUrl);
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

    it('should redirect to home', function() {
	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/#/home');
    });

});
