import axios from 'axios';
import { createHash } from 'crypto';

const apiPublicKey = '448f574d2ccf1d80a635193f6d40d422';
const apiPrivateKey = 'fc549716ef2c3121d26899202eefe5a451646d8f';

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public/';

function getTimeStamp() {
    return new Date().getTime();
}

function getHash(ts, algorithm, encoding) {
    return createHash(algorithm)
        .update(ts + apiPrivateKey + apiPublicKey)
        .digest(encoding);
}

function getUrlRequest(url, offset=0, limit=20) {
    let ts = getTimeStamp();
    let hash = getHash(ts, 'md5', 'hex');

    let config = {
        url: url,
        params: {
            ts: ts,
            apikey: apiPublicKey,
            hash: hash,
            offset: offset,
            limit: limit,
        }
    }

    return config;
}

export default {
    getAllCharacters: () => {
        return axios(getUrlRequest('characters')).then(res => res.data.data.results);
    }
}
