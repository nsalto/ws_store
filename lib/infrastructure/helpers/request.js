import axios from 'axios';

export default function ({
  url,
  method = 'POST',
  headers = {},
  opts = {},
  responseType = 'json',
  data = {},
}) {
  const options = {
    ...opts,
    url,
    method,
    data,
    responseType,
    headers
  };
  return axios(options)
    .then((res) => res.data);
}
