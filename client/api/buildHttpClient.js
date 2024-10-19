import axios from 'axios';

export default ({ req }) => {
  let config = undefined;

  if (req) {
    let baseURL = '/';
    let headers = undefined;
    if (typeof window === 'undefined') {
      baseURL =
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
      headers = req.headers;
    }
    config = { baseURL, headers };
  }

  return axios.create(config);
};
