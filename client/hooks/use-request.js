import axios from 'axios';

export default ({ url, method, body, onError, onSuccess }) => {
  const sendRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      if (onError) {
        onError(err.response.data);
      }
    }
  };

  return { sendRequest };
};
