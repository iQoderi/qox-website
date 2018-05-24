import React, { Component } from 'react';
import { Table, Divider, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Styles from './ComponentList.less';

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '图标',
  dataIndex: 'icon',
  key: 'icon',
render: (text, record) => (<img src={record.icon} className={Styles.icon}/>),
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '中文名称',
  dataIndex: 'chineseName',
  key: 'chineseName',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type'
}, {
  title: '创建时间',
  dataIndex: 'creatTime',
  key: 'creatTime',
}, {
  title: '创建人',
  dataIndex: 'creator',
  key: 'creator'
}, {
  title: '更新人',
  dataIndex: 'updator',
  key: 'updator'
}, {
  title: '描述',
  dataIndex: 'subscribe',
  key: 'subscribe'
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">查看</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  ),
}];

let data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    id: i,
    key: i,
    name: 'todo１',
    chineseName: '待办１',
    creatTime: '2018-05-12',
    creator: 'ylethe',
    type: '页头',
    updator: 'ylethe',
    icon: 'http://oia85104s.bkt.clouddn.com/head-pic.jpeg',
    subscribe: '啦啦啦～'
  })
};

export default class ComponentList extends Component {
  render () {
    return (
      <PageHeaderLayout title="组件列表">
        <Card>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageHeaderLayout>
    )
  }
}