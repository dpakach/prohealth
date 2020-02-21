module.exports = {
    url() {
        return this.api.launch_url + '/query/{queryId}'
    },
    commands: {
        getTitleText: function () {
            return new Promise((resolve) => {
                this.waitForElementVisible('@titleElement')
                    .api.getText('@titleElement', text => {
                    resolve(text)
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
