import React, { Component } from 'react';
import { Form, Button, Input, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@Form.create()
export default class PageAdd extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('添加页面');
  }

  handleSubmit = e => {
    e.preventDefault();
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
                添加
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
};
