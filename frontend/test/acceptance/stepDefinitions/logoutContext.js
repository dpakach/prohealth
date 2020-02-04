const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');

const emailField = '//div/input[@placeholder="email"]';
const passwordField = '//div/input[@placeholder="password"]';
const loginButton = '//div/form/button[.="Log In"]';
const logoutButton = '//div/a/div[contains(text(),"Logout")]';
const loginPage = '//div/h1[contains(text(),"Login")]';

Given('user has logged in with email {string} and password {string}', function (email, password) {
    return client.url(client.launch_url + '/user/login').useXpath()
        .setValue(emailField, email)
        .setValue(passwordField, password)
        .click(loginButton)
        .useCss();
});


When('the user selects logout', function () {
    return client.useXpath().waitForElementVisible(logoutButton)
        .click(logoutButton)
        .useCss()
});

Then('the user should be logged out and redirected to the login page', function () {
    return client.useXpath().waitForElementVisible(loginPage)
        .useCss()
});
