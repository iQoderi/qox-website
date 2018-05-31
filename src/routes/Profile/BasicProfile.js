import React, { Component } from 'react';
import { Form, Select, Button, Input, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import styles from './BasicProfile.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const REG_COMPONENTID = /componentId\=\d+/ig;

@connect(({ component }) => ({
  component,
}))
@Form.create()
export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
  }

  getComponentId() {
    const match = location.href.match(REG_COMPONENTID);

    if (match) {
      const componentId = match[0].split('=')[1]; 
      return componentId;
    }

    return '';
  };
  componentDidMount() {
    const componentId = this.getComponentId();    

    if(componentId) {
      this.props.dispatch({
        type: 'component/detail',
        payload: {
          componentId
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      const componentId = this.getComponentId();      
      
      const type = componentId ? 'component/update' : 'component/register';

      this.props.dispatch({
        type,
        payload: {
          componentId,
          body: values
        }
      });

    });
  }

  selectType = (val) => {
    console.log(val);
  }

  render() {
    const { form, submitting, component } = this.props;
    const { detail } = component;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };

    const componentId = this.getComponentId();

    const getInitailVal = (key) => {
      if(componentId) {
        return {
          initialValue: detail[key]
        };
      }

      return {};
    };

    return (
      <PageHeaderLayout title="组件信息">
        <Card>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name', getInitailVal('name'))(<Input />)}
            </FormItem>
            <FormItem label="中文名称" {...formItemLayout}>
              {getFieldDecorator('cname', getInitailVal('cname'))(<Input />)}
            </FormItem>
            <FormItem label="类型" {...formItemLayout}>
              {getFieldDecorator('type', getInitailVal('type'))(<Input />)}
            </FormItem>
            <FormItem label="版本" {...formItemLayout}>
              {getFieldDecorator('version', getInitailVal('version'))(<Input />)}
            </FormItem>
            <FormItem label="图标" {...formItemLayout}>
              {getFieldDecorator('imageUrl', getInitailVal('imageUrl'))(<Input />)}
            </FormItem>
            <FormItem label="schema" {...formItemLayout}>
              {getFieldDecorator('schema', getInitailVal('schema'))(<TextArea rows={4} />)}
            </FormItem>
            <FormItem label="描述" {...formItemLayout}>
              {getFieldDecorator('description', getInitailVal('description'))(<TextArea rows={4} />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                {componentId ? '更新': '发布'}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
