describe('Curriculum App E2E Tests:', function() {
    var baseURL = 'http://turing:3333/';
    describe('Home Page', function() {
	it('Should be able to go to the signup page', function() {
	    browser.get(baseURL);
	    browser.ignoreSynchronization = true;
	    element.all(by.css('a.btn.btn-default')).get(1).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'signup');
	});
	it('Should be able to go back to the home page', function() {
	    element(by.css('a[href="/"]')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL);
	});
	it('Should be able to go to the login page', function() {
	    element.all(by.css('a.btn.btn-default')).first().click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'login');
	});
	it('Should be able to login with the test account', function() {
	    element(by.name('email')).sendKeys('t@t.t');
	    element(by.css('input[type=password]')).sendKeys('t');
	    element(by.css('button[type=submit]')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'profile#/');
	});
    });
    describe('Profile Page', function() {
	it('Should be able to go to the course search page', function() {
	    element.all(by.css('a.btn.btn-default.btn-large')).first().click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'courseSearch');
	});
	it('Should be able to go to the profile page', function() {
	    element.all(by.css('a.btn.btn-default.btn-large')).get(1).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'profile#/');
	});
	it('Should be able to go to a course page', function() {
	    browser.get(baseURL+'profile');
	    browser.ignoreSynchronization = true;
	    element(by.css('a[href="/courses/HUM 110     "]')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'courses/HUM%20110');
	});
	it('Should be able to go to a evaluation page', function() {
	    browser.get(baseURL+'profile');
	    element(by.css('a[href="/course_feedback/HUM 110     "]')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'course_feedback/HUM%20110');
	});
    });
    describe('Evaluation Page', function() {
	it('Should not be able to submit an empty evaluation', function() {
	    element(by.css('#myButton')).click();
	    browser.switchTo().alert().getText().then(function(errorText) {
		expect(errorText).toBe('There is a duplicate or an empty skill. Please adjust before submitting');
	    });
	    browser.switchTo().alert().dismiss();
	});
	it('Should not be able to evaluate a duplicate skill', function() {
	    element.all(by.cssContainingText('option','Teamwork')).first().click();
	    element.all(by.cssContainingText('option','Social Awareness and Empathy')).get(1).click();
	    element.all(by.cssContainingText('option','Teamwork')).get(2).click();
	    expect(element.all(by.css('span#skilltext')).get(2).getText()).toEqual('There are duplicate skills selected. Please reselect before voting');
	});
	it('Should not be able to submit an evaluation that has duplicate skills', function() {
	    element(by.css('#myButton')).click();
	    browser.switchTo().alert().getText().then(function(errorText) {
		expect(errorText).toBe('There is a duplicate or an empty skill. Please adjust before submitting');
	    });
	    browser.switchTo().alert().dismiss();
	});
	it('Should be able to evaluate skills', function() {
	    element.all(by.cssContainingText('option','Communication')).first().click();
	    element(by.css('input#score0')).click();
	    element.all(by.cssContainingText('option','Creativity')).get(1).click();
	    element.all(by.cssContainingText('option','Critical Thinking')).get(2).click();
	    element(by.css('input#score2')).click();
	    element(by.css('button#myButton')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL);
	});
    });
    describe('Course Search Page', function() {
	it('Should be able to search a course by its name', function() {
	    browser.get(baseURL+'courseSearch');
	    element.all(by.css('input.tablesorter-filter')).get(1).sendKeys('AMS');
	    browser.wait(protractor.ExpectedConditions.presenceOf(element.all(by.css('tbody tr')).first()),20000,'Element taking too long to appear');
	    expect(element.all(by.css('tbody tr')).first().isDisplayed()).toBeTruthy();
	});
	it('Should be able to click to add a course', function() {
	    element.all(by.css('tbody tr')).first().click();
	    var elem = element(by.css('div#myModal'));
	    var until = protractor.ExpectedConditions;
	    browser.wait(until.presenceOf(elem),5000,'Element taking too long to appear');
	    expect(elem.isDisplayed()).toBeTruthy();
	});
	it('Should be able to add a course', function() {
	    element.all(by.css('button.btn.btn-default.dropdown-toggle.time-btn')).first().click();
	    element.all(by.css('ul.dropdown-menu li')).get(2).click();
	    element.all(by.css('button.btn.btn-default.dropdown-toggle.time-btn')).get(1).click();
	    element.all(by.css('div.dropdown.open ul.dropdown-menu li')).get(1).click();
	    element(by.css('button.btn.btn-primary')).click();
	    expect(browser.getCurrentUrl()).toEqual(baseURL+'course_feedback/AMS%20110');
	});
    });
});
