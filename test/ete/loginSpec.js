describe('REIMS web login', function() {
    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var loginForm = element(by.id('loginForm'));

    beforeEach(function() {
	browser.get('/');
    });
    
    it('should have a title', function() {
	expect(browser.getTitle()).toEqual('REIMS Web');
    });

    it('should redirect to login', function() {
	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
    });

    it('should not allow random user / password access', function() {
	randUser = Math.random().toString(36).substring(8);
	randPass = Math.random().toString(36).substring(8);

	console.log("Trying login with user:<" + randUser + "> and pass:<" + randPass + ">");
	username.sendKeys(randUser);
	password.sendKeys(randPass);

	loginForm.submit();

	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
    });

    it('should allow the test user to log in', function() {
	username.sendKeys("reimswebmaster");
	password.sendKeys("thesecretpassword");

	loginForm.submit();
	browser.refresh();

	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/home');
    });
});
