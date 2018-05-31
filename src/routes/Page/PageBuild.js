import React, { Component } from 'react';
import Styles from './PageBuild.less';
import { Form, Icon, Input, Button, Switch, Tag, Divider,　Modal, Card, message } from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { buildPage, getPageComponents } from '../../services/api';
import { connect } from 'dva';
import { applyMiddleware } from 'redux';

const { Meta } = Card;
const createForm = Form.create;
const FormItem = Form.Item;

const REG_PAGEID = /pageId\=\d+/ig;

const options = [
  {
    icon: 'delete',
    title: '删除组件',
    option(index) {
      const { modules } = this.state;
      const newModules = [...modules.slice(0, index), ...modules.slice(index + 1)]

      this.setState({
        modules: newModules
      });
    }
  },
  {
    icon: 'up',
    title: '上移',
    option(index) {
      const { modules } = this.state;
      
      if (index === 0) {
        return;
      }

      const newModules = [...modules.slice(0, index - 1), modules[index], modules[index - 1], ...modules.slice(index + 1)];

      this.setState({
        modules: newModules
      }, () => {
        this.setState({
          selectedModule: index - 1
        });
      });
    }
  },
  {
    icon: 'down',
    title: '下移',
    option(index) {
      const { modules } = this.state;
      const len = modules.length;

      if (index === len - 1) {
        return;
      }

      const newModules = [...modules.slice(0, index), modules[index + 1],  modules[index], ...modules.slice(index + 2)];      

      this.setState({
        modules: newModules,
      }, () => {
        this.setState({
          selectedModule: index + 1
        });
      });
    }
  }
];

@connect(({ component }) => ({
  component,
}))
@Form.create()
class PageBuild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponentsForm: true,
      selectedIdx: 2,
      visible: false,
      selectedModule: 0,
      modules: []
    };
    this.handleSubmit = ::this.handleSubmit;
  }

  getPageId() {
    const match = location.href.match(REG_PAGEID);

    if (match) {
      const pageId = match[0].split('=')[1]; 
      return pageId;
    }

    return '';
  };

  getComponents() {
    const { component: { list, page } } = this.props;
    this.props.dispatch({
      type: 'component/list',
      payload: page
    });
  };

  async getOriginModules() {
    const pageId = this.getPageId();
    const { data: { modules } } = await getPageComponents(pageId);

    console.log(modules);
    // const mods = modules.map((module) => {
    //   return {
    //     id: module.moduleId,
    //     name: module.moduleName,
    //     version: module.moduleVersion
    //   };
    // });

    this.setState({
      modules
    });
  }

  componentDidMount() {
    // this.getSchemaForm(this.state.schema);
    this.getOriginModules();
    this.getComponents();
  }

  switchChange = checked => {
    console.log(checked);
  }

  // 提交配置项
  async handleSubmit(e){
    e.preventDefault();
    const { modules } = this.state;

    const pageId = this.getPageId();
    const _modules = modules.map((mod, idx) => {
      return {
        name: mod.name,
        version: mod.version,
        id: mod.id
      };
    });

    const result = await buildPage(pageId, _modules);

    message.success('保存成功');
    
    window.frames[0].postMessage('reload', '*');
  }
  // 添加组件
  addComponent = e => {
    e.preventDefault();
    this.setState({
      visible: true
    });
  }

  handleOk = () => {
    this.setState({
      visible: false
    });

    const { selectedIdx, modules } = this.state;
    const { list } = this.props.component;
    const component = list[selectedIdx];

    const newModules = [...modules, component];

    this.setState({
      modules: newModules
    });

  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleSelect = (idx) => {
    this.setState({
      selectedIdx: idx
    });
  };

  publishPage = e => {
    e.preventDefault();
  }

  handleSelectModule = (idx) => {
    this.setState({
      selectedModule: idx
    });
  }

  renderFormItem(v) {
    const { form: { getFieldDecorator }, } = this.props;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    
    if (v.type === 'boolean1') {
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
  };

  renderSchemaForm() {
    const { modules, selectedModule } = this.state;
    const currentModule = modules[selectedModule];
    let schema = {};

    if (currentModule) {
      try {
        schema = JSON.parse(currentModule.schema);
      }catch(e){
        schema = {};
        console.log(e);
      }
    }

    console.log('schema', schema);

    const { properties ={} } = schema || {};

    const keys = Object.keys(properties);

    return (
      <Form  onSubmit={this.handleSubmit} layout="vertical">
          {
            keys.map((key, index) => {
              const item = properties[key];
              const subProps = item.properties || {};
              const subKeys = Object.keys(subProps);

              if (item.type === 'object') {
                return (
                  <div key={`CREATE-${index}`}>
                    <p className={Styles.formItemTitle}>{item.title}</p>
                    {
                      subKeys.map((v, subIdx) => {
                        const subItem = {
                          name: v,
                          ...subProps[v]
                        };
                        return (
                          <div key={`subkey=${index}`} style={{
                            paddingLeft: '5px'
                          }}>
                            {this.renderFormItem(subItem)}
                          </div>
                        );
                      })
                    }
                  </div>
                )
              } else {
                this.renderFormItem(item);
              }
            })
          }
         <FormItem>
           <Button type="primary" htmlType="submit">
            保存
           </Button>
          </FormItem>
      </Form>
    );
  }

  render() {
    const { form: {getFieldDecorator}, component } = this.props;
    const { selectedIdx, modules, selectedModule } = this.state;
    const { list } = component;

    const currentModule = modules[selectedModule];
    let schema = {};

    if (currentModule) {
      try {
        schema = JSON.parse(currentModule.schema);
      }catch(e){
        schema = {};
        console.log(e);
      }
    }

    const pageId = this.getPageId();

    return (
      <PageHeaderLayout title="页面搭建">
        <div className={Styles.container}>
         <div className={Styles.preview}>
          <a href={`http://127.0.0.1:7001/qox/index.html?pageId=${pageId}`} target="_blank">打开页面</a>
         </div>
          <section className={Styles.pages}>
            <div className={Styles.page}>
              <div className={Styles.nav} />
              <iframe src={`http://127.0.0.1:7001/qox/index.html?pageId=${pageId}`} style={{
                height: '417px',
                width: '250px',
                border: 'none'
              }}
              frameboder="no"
              />
            </div>
            <div className={Styles.page}>
              <div className={Styles.nav} />
              <div className={Styles.main}>
                {
                  modules.map((item, index) => {
                    return (
                      <div className={Styles.module} style={{
                        background: `url(${item.imageUrl}) no-repeat center`,
                        backgroundSize: 'contain',
                        border: selectedModule === index ? '2px solid #1890ff' : '1.5px dashed #ccc'
                        }}
                        key={`MODULE-${index}`}
                        onClick={()=>{this.handleSelectModule(index)}}
                      >
                        <span className={Styles.componentName}>{item.cname}</span>
                        <div className={Styles.option}>
                          {
                            options.map((option) => {
                              return <Icon type={option.icon} style={{
                                color: '#fff',
                                cursor: 'pointer'
                              }} 
                              title={option.title}
                              onClick={option.option.bind(this, index)}
                              />;
                            })
                          }
                        </div>
                      </div>
                    );
                  })
                }
                <div className={Styles.add} onClick={this.addComponent}>
                  <Icon type="plus-circle-o" className={Styles.icon} />添加组件
                </div>
              </div>
            </div>
          </section>

          <section className={Styles.editor}>
            <p className={Styles.title}>组件配置</p>
            <Divider />
            {this.renderSchemaForm()}
          </section>
        </div>
        <Modal
          title="添加组件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{
            // width: '500px'
          }}
          bodyStyle={{
            // width: '500px',
            display: 'flex',
            justifyContent: 'space-betweeen',
            height: '500px',
            flexWrap: 'wrap',
            overflowX: 'hidden',
            overflowY: 'scroll'
          }}
        >
          {
            list.map((item, index) => {
              const border =  index === selectedIdx ? '2px solid #1890ff' : null;

              return (
                <Card
                    hoverable
                    key={`CARD-${index}`}
                    style={{ width: '200px',
                    border,
                    height: '200px', 
                    marginBottom: '20px', 
                    marginRight: '20px',
                    borderRadius: '5px' }}
                    onClick={()=>{this.handleSelect(index)}}
                    cover={<div style={{position: 'relative', height: '200px'}}>
                     <img alt="example" src={item.imageUrl} style={{width:'200px',height: '180px'}}/>
                     <span style={{
                       display: 'block',
                       width: '200px',
                       position: 'absolute',
                       left:0,
                       bottom: 0,
                       height: '20px',
                       lineHeight: '20px',
                       textAlign: 'center',
                       backgroundColor: 'rgba(0,0,0,0.5)',
                       color: '#fff'
                     }}>{item.cname}</span>
                   </div>}
                >
                </Card>
              )
            })
          }
        </Modal>
      </PageHeaderLayout>
    );
  }
}

export default PageBuild;
