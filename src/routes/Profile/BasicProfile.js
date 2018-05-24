import React, { Component } from 'react';
import { Form, Select, Button, Input, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('组件添加');
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  selectType = (val) => {
    console.log(val);
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    return (
      <PageHeaderLayout title="组件信息">
        <Card>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name')(<Input />)}
            </FormItem>
            <FormItem label="中文名称" {...formItemLayout}>
              {getFieldDecorator('chineseName')(<Input />)}
            </FormItem>
            <FormItem label="类型" {...formItemLayout}>
              {getFieldDecorator('type')(<Input />)}
            </FormItem>
            <FormItem label="版本" {...formItemLayout}>
              {getFieldDecorator('version')(<Input />)}
            </FormItem>
            <FormItem label="图标" {...formItemLayout}>
              {getFieldDecorator('icon')(<Input />)}
            </FormItem>
            <FormItem label="schema" {...formItemLayout}>
              {getFieldDecorator('schema')(<TextArea rows={4} />)}
            </FormItem>
            <FormItem label="描述" {...formItemLayout}>
              {getFieldDecorator('subscribe')(<TextArea rows={4} />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
