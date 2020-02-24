const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');


When('user logs in with email {string} and password {string}', function (email, password) {
    return client.page.loginPage().setUsernamePassword(email, password)
        .triesLogin()
});

Then('the user should be logged in', function () {
    return client.page.loginPage().isUserLoggedIn()
});

Then('an error message {string} should be shown in the same page', function (errorMsg) {
    return client.page.loginPage().loginErrorMessag(errorMsg)
});

Then('login button should be disabled', function () {
    return client.page.loginPage().loginButtonDisabled()
});
