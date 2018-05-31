import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


const API_PREFIX = 'http://127.0.0.1:7001';
// page
export async function registerPage(params) {
  return request(`${API_PREFIX}/page/register`, {
    method: 'POST',
    body: params
  });
};

// globalConf
export async function fetchGlobalConf() {
  return request(`${API_PREFIX}/global-conf/get`);
};

export async function updateGlobalConf(params) {
  return request(`${API_PREFIX}/global-conf/update`, {
    method: 'PUT',
    body: params
  });
}

export async function getPageList(page, limit) {
  const uri = `${API_PREFIX}/page/list?page=${page}&limit=${limit}`;

  return request(uri);
};


export async function registerComponent(body) {
  const uri = `${API_PREFIX}/component/create`;

  return request(uri, {
    method: 'POST',
    body
  });
};

export async function getComponentList(page, limit) {
  const uri = `${API_PREFIX}/component/list?page=${page}&limit=${limit}`;

  return request(uri);
};

export async function getComponent(componentId) {
  const uri = `${API_PREFIX}/component/detail?componentId=${componentId}`;

  return request(uri);
};

export async function updateComponent(componentId, body) {
  const uri = `${API_PREFIX}/component/update?componentId=${componentId}`;

  return request(uri, {
    method: 'PUT',
    body
  });
};


export async function buildPage(pageId, components) {
  const uri = `${API_PREFIX}/page/build?pageId=${pageId}`;

  return request(uri, {
    method: 'PUT',
    body: {
      components
    }
  });
};

export async function getPageComponents(pageId) {
  const uri = `${API_PREFIX}/page/components?pageId=${pageId}`;

  return request(uri);
}