import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './GlobalSetting.less';

const { TextArea } = Input;
export default class globalSetting extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    settingJson: ''
  };
  submit = (e) => {
    e.preventDefault();
    console.log(this.state.settingJson);
  }

  handleChange = (e) => {
    this.setState({settingJson: e.target.value});
  }

  render () {
    return (
      <PageHeaderLayout title="全局配置">
        <Card>
          <TextArea placeholder="请输入全局配置JSON" rows={14} value={this.state.settingJson} onChange={this.handleChange}/>
          <Button className={ Styles.submit }　type="primary" onClick={this.submit}>保存</Button>
        </Card>
      </PageHeaderLayout>  
    )
  }
};
