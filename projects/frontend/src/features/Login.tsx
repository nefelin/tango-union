import React, { FormEventHandler, useState } from 'react';

import { handleLogin } from '../auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const login = await handleLogin(email, password);
    setSubmitting(false);
    if (login) {
    } else {
      setError('Incorrect email or password');
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
          {error && <div className="bg-red-400 text-white font-bold rounded-lg py-2 px-6">{error}</div>}
          <div className="flex w-full justify-between">
            <button type="button" className="p-2 rounded-sm bg-gold-500">
              Register
            </button>
            <button
              disabled={submitting || !password || !email}
              className="p-2 rounded-lg bg-blue-500 disabled:bg-blue-300"
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
