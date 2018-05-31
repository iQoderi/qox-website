import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { registerComponent, getComponentList, getComponent, updateComponent } from '../services/api';

export default {
  namespace: 'component',
  state: {
    componentId: '',
    detail: {

    },
    list: [],
    page: {
      current: 0,
      limit: 10,
      total: 0
    },
  },
  effects: {
    *detail({ payload }, { call, put }) {
      const { data: { component } } = yield call(getComponent, payload.componentId);

      
      yield put({
        type: 'get',
        payload: {
          component
        }
      });
    },
    *list({ payload }, { call, put }){
      const { current = 0, limit = 10 } = payload;
      const { data } = yield getComponentList(current, limit);

      yield put({
        type: 'updatecomponentList',
        payload: data
      });
    },
    *update({ payload }, { call, put }) {
      const {componentId, body } = payload;
      const ret = yield updateComponent(componentId, body);

      message.success('更新组件成功');

      yield put(routerRedux.push(`/component/list`));      
    },
    *register({ payload }, { call, put }) {
      const { body } = payload;
      const ret = yield registerComponent(body);

      message.success('创建组件成功');

      yield put(routerRedux.push(`/component/list`));  
    }
  },
  reducers: {
    get(state, action) {
      return {
        ...state,
        detail: action.payload.component
      }
    },
    updatecomponentList(state, { payload: { list, page } }) {
      return {
        ...state,
        list,
        page
      };
    }
  }
};
