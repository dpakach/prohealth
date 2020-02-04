module.exports = {
    url(){
        return this.api.launch_url +'/query/create'
    },
    commands: {
        getInputXpath: function(input) {
            return this.elements.inputSelector.selector.replace("%s",input)
        },
        inputField: function(inputName, inputValue){
            return this.useXpath().setValue(this.getInputXpath(inputName), inputValue)
        },
        askQuestion: async function(elementsToEnter){
            await this.inputField('Title', elementsToEnter['Title']);
            await this.inputField('Description',elementsToEnter['Description']);
            await this.enterRelated(elementsToEnter['Related']);
            await this.inputField('Name of Patient',elementsToEnter['Name of Patient']);
            await this.inputField('Age',elementsToEnter['Age']);
            await this.inputField('Weight',elementsToEnter['Weight']);
            await this.inputField('Height',elementsToEnter['Height']);
            await this.click('@submitButton');

            return this.pause(30000)
        },
        enterRelated: function (type) {
            const selector = this.elements.relatedDropdownElement.selector.replace("%s", type)
            return this.waitForElementVisible('@relatedInput').click('@relatedInput')
                .useXpath()
                .waitForElementVisible(selector)
                .click(selector)
        },

    },
    elements: {
        inputSelector: {
            selector: '//*[@placeholder="%s"]',
            locateStrategy: 'xpath'
        },
        relatedInput: {
            selector: '//label[.="Related"]/../div',
            locateStrategy: 'xpath'
        },
        relatedDropdownElement: {
            selector: '//li[contains(@class, "ant-select-dropdown-menu-item") and .="%s"]',
            locateStrategy: 'xpath'
        },
        submitButton: {
            selector: '//button[@type="submit"]',
            locateStrategy: 'xpath'
        }
    }
}