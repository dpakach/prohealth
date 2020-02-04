const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');

const emailField = '//div/input[@placeholder="email"]';
const passwordField = '//div/input[@placeholder="password"]';
const loginButton = '//div/form/button[.="Log In"]';
const newsButton = '//div[.="News"]';

When('user selects News', function () {
    return client.useXpath().waitForElementVisible(newsButton)
        .click(newsButton)
        .useCss();
});

Then('a list of news headlines and little description should be shown', function () {
   return client.url(client.launch_url + '/news');
});

Given('user has entered email {string} and password {string} in the login form', function (email, password) {
    return client.useXpath().setValue(emailField, email)
        .setValue(passwordField, password)
        .useCss();
});

Given('user was logged in', function () {
    return client.useXpath().waitForElementVisible(loginButton)
        .click(loginButton)
        .waitForElementVisible(newsButton)
        .useCss();
});
