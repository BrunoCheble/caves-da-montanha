import axios from 'axios';
import qs from 'qs';
import serverUrl from '~/config/constants';

const getToken = async () => {
    console.log('%c Execute Get Token', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    let token = '';
    await axios.post(`${serverUrl}/token`, qs.stringify({
      'username': 'vitor',
      'password': '123',
      'grant_type': 'password',
    })).then((response) => {
      token = response.data.access_token;
    });
  
    return token;
  }
  
  export default getToken;