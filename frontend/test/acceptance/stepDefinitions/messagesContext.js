const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');

const messageBell = '//div//a[@href="/messages"]/i[.="message"]';
const seeAllMessages = '//span/a[@href="/messages"]/../following-sibling::div//a[@href="/notifications"]';

When('the user hovers to the message icon on the webUI', function () {
    return client.useXpath().waitForElementVisible(messageBell)
        .moveToElement(messageBell, 10, 10)
        .useCss();;
});

Then('new messages should be shown in the message window', function () {
    return client.useXpath().waitForElementVisible('//div[contains(@class, "window__head--text") and text() = "Messages"]')
        .useCss();
});

When('the user selects the message icon', function () {
    return client.useXpath().waitForElementVisible(messageBell)
        .click(messageBell)
        .useCss();
});

Then('the user should be redirected to the messages page with all messages', function () {
    return client.url(client.launch_url + '/messages');
});

When('the user navigates to see all link in message window', function () {
    return client.useXpath()
        .moveToElement(messageBell, 10, 10)
        .waitForElementVisible('//div[contains(@class, "window__head--text") and text() = "Messages"]')
        .click(seeAllMessages)
        .useCss();
});
