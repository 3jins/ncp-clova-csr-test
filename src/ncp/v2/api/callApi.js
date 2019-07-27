import qs from 'qs';
import axios from 'axios/index';
import authInfo from '../auth/authInfo';
import makeSignature from '../auth/makeSignature';

export default async (method, url, params) => {
  const baseUrl = 'https://ncloud.apigw.ntruss.com';
  params.responseFormatType = 'json';
  const data = method === 'GET' ? qs.stringify(params) : params;
  const urlQueryString = `${method === 'GET' ? `?${data}` : ''}`;
  const { accessKey } = authInfo;
  const timestamp = new Date().getTime();
  const signature = makeSignature(method, `${url}${urlQueryString}`, timestamp);

  const headers = {
    'x-ncp-iam-access-key': accessKey,
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-apigw-signature-v2': signature,
    'Content-Type': 'application/x-www-form-urlencoded', // TODO: Enable POST request
  };

  try {
    console.log(method, url, data);
    const response = await axios({
      method,
      url: `${baseUrl}${url}${urlQueryString}`,
      headers,
      data,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
