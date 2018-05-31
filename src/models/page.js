import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { registerPage, getPageList } from '../services/api';

export default {
  namespace: 'page',
  state: {
    pageId: '',
    list: [],
    page: {
      current: 0,
      limit: 10,
      total: 0
    },
  },
  effects: {
    *add({ payload }, { call, put }) {
      const { data: { pageId } } = yield call(registerPage, payload);

      
      yield put({
        type: 'save',
        payload: {
          pageId
        }
      });

      message.success('创建页面成功');
      
      yield put(routerRedux.push(`/page/build?pageId=${pageId}`));
    },
    *list({ payload }, { call, put }){
      const { current, limit = 10 } = payload;
      const { data } = yield getPageList(current, limit);

      yield put({
        type: 'updatePageList',
        payload: data
      });
      console.log(data);
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        pageId: action.payload.pageId
      }
    },
    updatePageList(state, { payload: { list, page } }) {
      return {
        ...state,
        list,
        page
      };
    }
  }
};
