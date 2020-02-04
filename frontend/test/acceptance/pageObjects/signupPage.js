module.exports = {
    url() {
        return this.api.launch_url +'/user/signup'
    },
    commands: {
        isSignupFormVisibile: function () {
            return this.useXpath().waitForElementVisible('@signupForm').useCss();
        }
    },
    elements: {
        signupForm:{
            selector: '//div[@class="card"]/form[@class="form"]',
            locateStrategy: 'xpath'
        }
    }

}