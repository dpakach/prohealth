module.exports = {
    url() {
        return this.api.launch_url + '/query/{queryId}'
    },
    commands: {
        getTitleText: function () {
            return new Promise((resolve) => {
                this.waitForElementVisible('@titleElement')
                    .api.getText('xpath', this.elements.titleElement.selector, text => {
                    resolve(text.value)
                })
            })
        }
    },
    elements: {
        titleElement: {
            selector: '//div[@class="list-item__title"]',
            locateStrategy: 'xpath'
        }
    }
}
