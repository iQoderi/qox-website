import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fetchGlobalConf, updateGlobalConf } from '../services/api';

export default {
  namespace: 'globalConf',
  state: {
    id: '',
    content: '',
  },
  effects: {
    *fetch(_, { call, put }) {
      const { data } = yield call(fetchGlobalConf);

      console.log(data);
      yield put({
        type: 'get',
        payload: data
      });
    },
    *save({payload}, {call, put}) {
      const result = yield call(updateGlobalConf, payload);
      message.success('保存成功:-D');
    },
    *update({payload}, {call, put}) {
      yield put({
        type: 'update',
        payload
      });
    }
  },
  reducers: {
    get(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    update(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
};
