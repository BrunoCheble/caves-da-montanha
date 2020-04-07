import axios from 'axios';

const apiBkp = axios.create({
  baseURL: `http://192.168.32.21:85/bkp_migrations`,
});


export default apiBkp;