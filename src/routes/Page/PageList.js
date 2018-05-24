import React, { Component } from 'react';
import { Table, Divider, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '中文名称',
  dataIndex: 'chineseName',
  key: 'chineseName',
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
    subscribe: '啦啦啦～'
  })
};

export default class ComponentList extends Component {
  state = {
    pagination: {
      pageSize: 10,
      current: 1
    },
  };
  // 表格变化
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
  }

  render () {
    return (
      <PageHeaderLayout title="页面列表">
        <Card>
          <Table columns={columns} dataSource={data} onChange={this.handleTableChange}/>
        </Card>
      </PageHeaderLayout>
    )
  }
}
