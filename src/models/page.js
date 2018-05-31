import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { registerPage } from '../services/api';

export default {
  namespace: 'page',
  state: {
    pageId: ''
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
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        pageId: action.payload.pageId
      }
    }
  }
};
