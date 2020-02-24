const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');


Given('user has browsed to the homepage', () => {
    return client.page.homePage().navigate();
})

Given('user has browsed to the login page', async () => {
    await client.page.homePage().browseToLogin()
    return client.page.loginPage().isLoginFormVisible();

});

When('user selects register now!', function () {
    return client.page.loginPage().registerNow();

});

Then('user should be redirected to signup page', function () {
    return client.page.signupPage().isSignupFormVisibile();
});

When('user selects signup', function () {
    return client.page.homePage().browseToSignup();
});

// Then('user should be redirected to the home page', function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

