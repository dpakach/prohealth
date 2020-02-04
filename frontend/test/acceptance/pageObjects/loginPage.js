const assert = require('assert');

module.exports = {
    url(){
        return this.api.launch_url + '/user/login'
    },
    commands:{
        isLoginFormVisible: function () {
        return this.useXpath().waitForElementVisible('@loginForm').useCss()
        },
        registerNow: function (){
            return this.useXpath()
                .waitForElementVisible('@registerNowLink')
                .click('@registerNowLink')
                .useCss()
        },
        setUsernamePassword: function (email, password) {
            return this.useXpath().setValue('@emailField', email)
                .setValue('@passwordField', password)
                .useCss();
        },
        triesLogin: function () {
            return this.useXpath().waitForElementVisible('@loginButton')
                .click('@loginButton')
                .useCss()
        },
        isUserLoggedIn: function () {
            return this.useXpath().waitForElementVisible('@logoutButton')
                .useCss();
        },
        loginErrorMessag: function (errorMsg) {
            return this.waitForElementVisible('@loginErrorMsg')
                .api.element(this.elements.loginErrorMsg.locateStrategy, this.elements.loginErrorMsg.selector, (result) => {
                    // console.log(result)
                    this.api.elementIdText(result.value['ELEMENT'], (result) => {
                        this.assert.strictEqual(result.value, errorMsg, "Error! text do not match")
                    })

                });
        },
        loginButtonDisabled: function () {
            return this.useXpath().waitForElementVisible('@disabledLoginButton')
                .useCss();
        }
    },
    elements:{
        loginForm: {
            selector: '//div/h1[contains(text(),"Login")]',
            locateStrategy: 'xpath'
        },
        registerNowLink: {
            selector: '//div/a[contains(text(),"register now!")]',
            locateStrategy: 'xpath'
        },
        emailField: {
            selector: '//div/input[@placeholder="email"]',
            locateStrategy: 'xpath'
        },
        passwordField: {
            selector: '//div/input[@placeholder="password"]',
            locateStrategy: 'xpath'
        },
        loginButton: {
            selector: '//div/form/button[.="Log In"]',
            locateStrategy: 'xpath'
        },
        logoutButton: {
            selector: '//div/a/div[contains(text(),"Logout")]',
            locateStrategy: 'xpath'
        },
        loginErrorMsg:{
            selector: '.form__error--text',
        },
        disabledLoginButton:{
            selector: '//div//button[@disabled][.= "Log In"]',
            locateStrategy: 'xpath'
        }
    }
}