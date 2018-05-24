import React, { Component } from 'react';
import Styles from './PageBuild.less';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Switch, Tag, Divider } from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;

const schemaJSON = {
  title: 'config',
  description: '组件配置',
  type: 'object',
  properties: {
    attrs: {
      type: 'object',
      title: '基本属性',
      properties: {
        showTitle: {
          type: 'boolean',
          title: '是否展示标题',
        },
      },
    },
    styles: {
      type: 'object',
      title: '组件样式',
      properties: {
        bgColor: {
          type: 'string',
          title: '背景颜色',
        },
        bgImage: {
          type: 'string',
          title: '背景图片',
        },
      },
    },
    data: {
      type: 'object',
      title: '动态数据配置',
      resourceId: '动态数据ID',
    },
  },
};
class PageBuild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schemaJSON,
      formItems: [],
    };
  }

  componentDidMount() {
    this.getSchemaForm(this.state.schema);
    console.log(this.state);
  }

  switchChange = checked => {
    console.log(checked);
  };
  // 获取配置项表单数据
  getSchemaForm = object => {
    const data = object.properties;

    for (let i in data) {
      const pro = data[i].properties;
      if (pro) {
        for (let j in pro) {
          const obj = {
            title: pro[j].title,
            type: pro[j].type,
            name: j,
          };
          this.state.formItems.push(obj);
          this.setState({
            formItems: this.state.formItems,
          });
        }
      }
    }
  };
  // 提交配置项
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // 添加组件
  addComponent = e => {
    e.preventDefault();
    console.log('添加组件');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formItems = this.state.formItems.map(v => {
      if (v.type === 'boolean') {
        return (
          <FormItem label={v.title} {...formItemLayout} key={v.name}>
            {getFieldDecorator(`${v.name}`)(<Switch onChange={this.switchChange} />)}
          </FormItem>
        );
      } else {
        return (
          <FormItem label={v.title} key={v.name}>
            {getFieldDecorator(`${v.name}`)(<Input />)}
          </FormItem>
        );
      }
    });
    return (
      <div className={Styles.container}>
        <section className={Styles.pages}>
          <div className={Styles.content}>
            {/* <p className={Styles.title}>预览区域</p> */}
            <div className={Styles.page}>
              <div className={Styles.nav} />
            </div>
          </div>
          <div className={Styles.content}>
            {/* <p className={Styles.title}>编辑区域</p> */}
            <div className={Styles.page}>
              <div className={Styles.nav} />
              <div className={Styles.main}>
                <div className={Styles.add} onClick={this.addComponent}>
                  <Icon type="plus-circle-o" className={Styles.icon} />添加组件
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={Styles.editor}>
          <p className={Styles.title}>组件配置</p>
          <Divider />
          <Form onSubmit={this.handleSubmit} layout="vertical">
            {formItems}
            <FormItem>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
            </FormItem>
          </Form>
        </section>
      </div>
    );
  }
}

export default createForm()(PageBuild);
