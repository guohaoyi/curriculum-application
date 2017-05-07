describe('Curriculum App E2E Tests:', function() {
    describe('Insertion description here', function() {
	it('Should be able to login', function() {
	    browser.get('http://localhost:3333/login');
	    element(by.css('button#myButton')).click();
	    element(by.binding('error')).getText().then(function(errorText) {
		expect(errorText).toBe('There is a duplicate or an empty skill. Please adjust before submitting');
	    });
	});
    });
});
