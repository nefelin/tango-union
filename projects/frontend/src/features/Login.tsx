import React, { FormEventHandler, useState } from 'react';

import { getApiUrl } from '../util/getApiUrl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions: RequestInit = {
      credentials: 'include',
      method: 'POST',
      headers,
      body,
    };

    const res = await fetch('http://localhost:4000/auth/login', requestOptions);

    if (res.ok) {
      window.location.replace('/');
    } else {
      setError('Something went wrong. Please refresh the page and try again');
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={onSubmit}>
        <div className="rounded-lg shadow-xl bg-blue-100 p-8 flex flex-col gap-4">
          <div className="w-full text-center">Login</div>
          <label>
            <div>Email</div>
            <input
              className="p-2 rounded-md"
              placeholder="Email"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <label>
            <div>Password</div>
            <input
              className="p-2 rounded-md"
              placeholder="Password"
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          {error && <div>{error}</div>}
          <div className="flex w-full justify-between">
            <button className="p-2 rounded-sm bg-gold-500">Register</button>
            <button
              disabled={submitting}
              className="p-2 rounded-sm bg-green-500"
              type="submit"
            >
              {submitting ? 'spinner' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
