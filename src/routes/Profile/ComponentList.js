import React, { Component } from 'react';
import { Table, Divider, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'dva/router';
import { connect } from 'dva';
import Styles from './ComponentList.less';

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '图标',
  dataIndex: 'imageUrl',
  key: 'imageUrl',
  render: (text, record) => (<img src={record.imageUrl} className={Styles.icon}/>),
},{
  title: '中文名称',
  dataIndex: 'cname',
  key: 'cname',
},{
  title: '创建时间',
  dataIndex: 'createAt',
  key: 'createAt',
}, {
  title: '创建人',
  dataIndex: 'createBy',
  key: 'createBy'
}, {
  title: '更新人',
  dataIndex: 'updateBy',
  key: 'updateBy'
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/component/edit/?componentId=${record.id}`}>查看</Link>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  ),
}];

@connect(({ component }) => ({
  component,
}))
class ComponentList extends Component {
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

  getComponents() {
    const { component: { list, page } } = this.props;
    this.props.dispatch({
      type: 'component/list',
      payload: page
    });
  };
  componentDidMount() {
    this.getComponents();
  }
  
  render () {
    const { component: { list, page } } = this.props;

    console.log(list[0]);

    return (
      <PageHeaderLayout title="组件列表">
        <Card>
          <Table columns={columns} dataSource={list} onChange={this.handleTableChange}/>
        </Card>
      </PageHeaderLayout>
    )
  }
}

export default ComponentList;
