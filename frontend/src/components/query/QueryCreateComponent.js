import React from 'react';

import {Form, Input, upload,  Button} from 'antd';

const FormItem = Form.Item;

class FormLayoutDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        return (
            <div>
                <h1>post</h1>
                <Form layout="vertical">
                    <FormItem label="Field A">
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field A">
                        <upload />
                    </FormItem>
                    <FormItem label="Field B">
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default FormLayoutDemo;
