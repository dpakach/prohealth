import React from 'react';

import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class FormLayoutDemo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="section section--detail u-margin-top-big">
                <h1 className="heading-primary">post</h1>
                <Form layout="vertical" className="">
                    <FormItem label="Field A">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field B">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn btn--text">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default FormLayoutDemo;
