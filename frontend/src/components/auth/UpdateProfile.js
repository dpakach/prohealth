import React from 'react';

// import {Form, Input, Tooltip, Icon, Checkbox, Button} from 'antd';

import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class UpdateProfile extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div>
                <h1 className="heading-primary u-margin-top-big">post</h1>
                <Form layout="vertical" className="section section--detail">
                    <FormItem label="Field A">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field B">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field B">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field B">
                        <Input className="form__input" placeholder="input placeholder" />
                    </FormItem>
                    <FormItem label="Field B">
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


export default UpdateProfile;
