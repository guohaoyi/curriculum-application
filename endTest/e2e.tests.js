describe('Curriculum App E2E Tests:', function() {
    describe('Home Page', function() {
	it('Should let me go to the login page', function() {
	    browser.get('http://localhost:3333');
	    browser.ignoreSynchronization = true;
	    element(by.css('a.btn.btn-default')).click();
	    expect(browser.getCurrentUrl()).toEqual('http://localhost:3333/login');
	});
	it('Should be able to login with the test account', function() {
	    element(by.name('email')).sendKeys('test@test.test');
	    element(by.css('input[type=password]')).sendKeys('test');
	    element(by.css('button[type=submit]')).click();
	    expect(browser.getCurrentUrl()).toEqual('http://localhost:3333/login');
	});
    });
});
