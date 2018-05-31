import React, { Component } from 'react';
import { Form, Card, Button, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import Styles from './GlobalSetting.less';

const { TextArea } = Input;
const FormItem = Form.Item;

@connect(({ globalConf }) => ({
  globalConf,
}))
@Form.create()
export default class globalSetting extends Component {
  constructor (props) {
    super(props);
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      const { content } = value;
      this.props.dispatch({
        type: 'globalConf/save',
        payload: {
          id: 1,
          content
        }
      });
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'globalConf/fetch'
    });
  }

  render () {
    const { globalConf, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };

    return (
      <PageHeaderLayout title="全局配置">
        <Card>
          <Form onSubmit={this.submit} layout="vertical">
            <FormItem label="配置" {...formItemLayout}>
              {getFieldDecorator('content', {
                  initialValue: globalConf.content
                })(<TextArea style={{
                  width: '500px',
                  height: '200px'
                }}
              />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </FormItem>
          {/* <TextArea placeholder="请输入全局配置JSON" rows={14}  value={globalConf.content} /> */}
          {/* <Button className={ Styles.submit }　type="primary" onClick={this.submit}>保存</Button> */}
          </Form>
        </Card>
      </PageHeaderLayout>  
    )
  }
};
