import React, { Component } from 'react';
import { Form, Button, Input, Card, Alert } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ page }) => ({
  page,
}))
@Form.create()
export default class PageAdd extends Component {
  constructor(props) {
    super(props);
  }


  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      this.props.dispatch({
        type: 'page/add',
        payload: values
      });

    });
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    return (
      <PageHeaderLayout title="页面信息">
        <Card>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name')(<Input />)}
            </FormItem>
            <FormItem label="页面logo" {...formItemLayout}>
              {getFieldDecorator('logo')(<Input />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
};
