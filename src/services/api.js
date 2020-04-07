import axios from 'axios';
import serverUrl from '~/config/constants';
import apiBkp from '~/services/bkp';
import getToken from '~/services/token';

//const serverUrl = 'http://192.168.32.21:85/wscaves';

const api = axios.create({
  baseURL: `${serverUrl}/api`,
  cache: false
});
/*
const saveBkp = async (content) => {
  console.log('--------------------------- Execute BKP Sync ---------------------------');
  
  if (content.data == null) {
    return [];
  }

  const data = new FormData();
  const url = content.config.url.split('/');

  data.append('sync', url[url.length - 1]);

  let sql = Array.isArray(content.data) ? content.data.join('||| ') : JSON.stringify(content.data);
  data.append('content', sql);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
    }
  };

  await apiBkp.post('/index.php', data, config).then((resp) => {
    console.log(resp);
  }).catch(err => {
    console.log(err);
  });

}*/

api.interceptors.request.use(async (config) => {
  console.log('%c Execute Interceptors Request', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
  const token = await getToken();
  config.headers = { ...config.headers, Authorization: "Bearer " + token };
  return config;
});

/*
api.interceptors.response.use(async (response) => {
  console.log('--------------------------- Execute Interceptors Response ---------------------------');
  await saveBkp(response);
  return response;
});
*/
export default api;
