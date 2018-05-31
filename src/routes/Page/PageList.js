import React, { Component } from 'react';
import { Table, Divider, Card } from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import Styles from './PageList.less'

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '页面logo',
  dataIndex: 'logo',
  key: 'logo',
  render: (text, record) => (
    <img src={record.logo} className={Styles.logo} />
  )
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name'
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
  title: '操作',
  key: 'action',
  render: (text, record) => {
    const link = `/page/build?pageId=${record.id}`
    return (
      <span>
        <Link to={link}>查看</Link>
        <Divider type="vertical" />
        <a href={link}>删除</a>
      </span>
    )
  },
}];

@connect(({ page }) => ({
  page,
}))
class PageList extends Component {
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

  getPage() {
    const { page: { list, page } } = this.props;

    this.props.dispatch({
      type: 'page/list',
      payload: page
    });
  };
  componentDidMount() {
    this.getPage();
  }

  render () {
    const { page: { list, page } } = this.props;

    return (
      <PageHeaderLayout title="页面列表">
        <Card>
          <Table columns={columns} dataSource={list} onChange={this.handleTableChange}/>
        </Card>
      </PageHeaderLayout>
    )
  }
}

export default PageList;
