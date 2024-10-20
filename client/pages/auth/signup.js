import Router from 'next/router';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

const auth = () => {
  const onRequestError = (err) => {
    if (err.status === 400 && err.title.includes('validation') && err.errors) {
      const map = new Map();
      for (const k in err.errors) {
        const element = document.getElementById(k);

        if (element) {
          element.classList.add('is-invalid');
        }
        map.set(k, err.errors[k]);
      }
      setValidationErrors(map);
      return;
    }

    setGenericErrors(err);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState(new Map());
  const [genericErrors, setGenericErrors] = useState();
  const { sendRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => {
      console.log(data);
      Router.push('/');
    },
    onError: onRequestError,
  });

  const clearErrorClass = () => {
    const form = document.querySelector('form');
    for (const input of form.querySelectorAll('input')) {
      input.classList.remove('is-invalid');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    clearErrorClass();
    sendRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group mb-3">
        <label>Email Address</label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        {validationErrors.has('email') && (
          <div className="invalid-feedback">
            <ul>
              {validationErrors.get('email').map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="form-group mb-3">
        <label>Password</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
        {validationErrors.has('password') && (
          <div className="invalid-feedback">
            <ul>
              {validationErrors.get('password').map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {genericErrors && (
        <div className="alert alert-danger" role="alert">
          {genericErrors.title}
          {genericErrors.detail ? `: ${genericErrors.detail}` : ''}
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default auth;
