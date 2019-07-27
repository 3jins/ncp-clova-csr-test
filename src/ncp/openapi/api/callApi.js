import qs from 'qs';
import axios from 'axios/index';
import authInfo from './auth/authInfo';

export default async (method, url, params) => {
  const baseUrl = 'https://naveropenapi.apigw.ntruss.com';
  const data = method === 'GET' ? qs.stringify(params) : params;
  const urlQueryString = `${method === 'GET' ? `?${data}` : ''}`;
  const { clientId, secretKey } = authInfo;

  const headers = {
    'X-NCP-APIGW-API-KEY-ID': clientId,
    'X-NCP-APIGW-API-KEY': secretKey,
    'Content-Type': 'application/octet-stream',
  };

  try {
    const fullUrl = `${baseUrl}${url}${urlQueryString}`;
    // console.log(method, fullUrl, data);
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
