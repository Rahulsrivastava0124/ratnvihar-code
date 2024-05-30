import axios from 'axios';
import {getAuthData} from 'src/helpers/helper';

const access_token = getAuthData('access_token');
const instance = axios.create({
    baseURL: 'http://localhost:9083/' + 'api',
    headers: {
      Authorization: access_token ? 'Bearer ' + access_token : ''
    }
});

export default instance;
