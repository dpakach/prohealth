import React from 'react';

import {Form, Input, Tooltip, Icon, Checkbox, Button} from 'antd';

const FormItem = Form.Item;

class QueryCreateComponent extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        console.log(this.props.form);
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="section section--form">
                <h1 className="heading-primary u-margin-top-big">Query</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="E-mail">
                        <Input />
                    </FormItem>

                    <FormItem {...formItemLayout} label="Password">
                        <Input type="password" />
                    </FormItem>

                    <FormItem {...formItemLayout} label="Confirm Password">
                        <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                        />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }>
                        <Input />
                    </FormItem>

                    <FormItem {...formItemLayout} label="Phone Number">
                        <Input style={{width: '100%'}} />
                    </FormItem>

                    <FormItem {...formItemLayout} label="Website">
                        <Input />
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default QueryCreateComponent;
