var EC = protractor.ExpectedConditions;

describe('REIMS web add', function() {
  var toasts = element.all(by.repeater('message in messages'));
  
  beforeEach(function() {
    browser.get('/#/add');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/add');
    expect(toasts.count()).toBe(0);
  });

  it('should fail to add an empty form', function() {
    element(by.buttonText('Add')).click();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(toasts.count()).toBe(1);
    expect(toasts.getText()).toMatch(/Please fill in a Type/);
    browser.ignoreSynchronizations = false;
  });
});
