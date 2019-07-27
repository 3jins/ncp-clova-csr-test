import CryptoJS from 'crypto-js';
import authInfo from './authInfo';

export default (method, url, timestamp) => {
  console.log(url);
  const {
    space, newLine, accessKey, secretKey,
  } = authInfo;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(String(timestamp));
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
};
