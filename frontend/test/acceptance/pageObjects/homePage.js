module.exports = {
    url() {
        return this.api.launch_url + '/user/signup'
    },
    commands: {
        browseToLogin: function () {
            return this.useXpath()
                .waitForElementVisible('@loginButton')
                .click('@loginButton')
                .useCss()
        },
        browseToSignup: function () {
            return this.useXpath().click('@signButton').useCss();
        }
    },
    elements: {
        loginButton: {
            selector: '//div/a[@href="/user/login"]',
            locateStrategy: 'xpath'
        },
        signButton: {
            selector: '//div[contains(text(),"Signup")]',
            locateStrategy: 'xpath'
        }
    }
}
