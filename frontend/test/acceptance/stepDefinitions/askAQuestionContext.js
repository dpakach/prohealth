const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');
const assert = require('assert');

const askAQuestionButton = '//div[.="Ask A Question"]';

When('the user selects Ask A Question', function () {
    return client.useXpath().waitForElementVisible(askAQuestionButton)
        .click(askAQuestionButton);
});

When('user asks a question by filling the following details in the question form:', function (dataTable) {
    var elementsToEnter = dataTable.rowsHash();
    return client.page.askQuestionPage().askQuestion(elementsToEnter);
});

Then('the user should be redirected to the query page with title {string}', async function (title) {
    const pageTitle = await client.page.queryPage().getTitleText()
    console.log(pageTitle)
    return assert.equal(pageTitle, title, `Could not load page titled "${pageTitle}"`)
});
