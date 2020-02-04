const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');
const fetch = require('node-fetch');


Given('user has created an account with email {string} and password {string}', function (email, password) {
    console.log(`Basic ` + `${client.globals.admin_username}:${client.globals.admin_password}`)
    const header = {}
    header['Authorization'] = `Basic ` +   Buffer.from(`${client.globals.admin_username}:${client.globals.admin_password}`).toString('base64')
    header['Content-Type'] = 'application/json'
    return fetch(client.globals.backend_url + '/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            first_name: "Test", last_name: "User", email, password, gender: "M", date_of_birth: "2020-02-12"
        }),
        headers: header
    })
        .then(res => res.text())
        .then(res => {
        console.log(res)
    })
});

When('user enters email {string} and password {string} in the login form', function (email, password) {
    return client.page.loginPage().setUsernamePassword(email,password)
});

When('user tries to login', function () {
    return client.page.loginPage().triesLogin()
});

Then('the user should be logged in', function () {
    return client.page.loginPage().isUserLoggedIn()
});

Then('an error message {string} should be shown in the same page', function (errorMsg) {
   return client.page.loginPage().loginErrorMessag(errorMsg)
});

Then('login button should be disabled', function () {
    return client.page.loginPage().loginButtonDisabled
});



