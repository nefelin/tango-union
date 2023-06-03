import { Button, CircularProgress } from '@mui/material';
import React, { FormEventHandler, useState } from 'react';

import { useWhoAmIQuery } from '../../generated/graphql';
import { handleLogin } from '../auth';
import { emailRegex, passwordValid } from './MenuRegister';

const MenuLogin = ({
  onLogin,
  onRegister,
  onCancel,
}: {
  onCancel: VoidFunction;
  onLogin: VoidFunction;
  onRegister: VoidFunction;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const { refetch } = useWhoAmIQuery();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const login = await handleLogin(email, password);
    setSubmitting(false);
    if (login) {
      await refetch();
      onLogin();
    } else {
      setError('Incorrect email or password');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full text-2xl text-center">Login</div>
      <div className="flex flex-col gap-y-4 mt-6">
        <label>
          <div>Email</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Email"
            value={email}
            onInput={(e) => {
              setError('');
              setEmail(e.currentTarget.value);
            }}
            onBlur={() => {
              if (!emailRegex.test(email)) {
                setError('Email address is invalid');
              }
            }}
          />
        </label>
        <label>
          <div>Password</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        {error && (
          <div className="bg-red-400 text-white font-bold rounded-lg py-2 px-6">
            {error}
          </div>
        )}
        <div className="flex w-full justify-between mt-4">
          <Button
            className="py-2 px-6 rounded-lg border border-black"
            type="button"
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={submitting || !password || !email}
            variant="contained"
            type="submit"
          >
            {submitting ? <CircularProgress /> : 'Login'}
          </Button>
        </div>
        <Button type="button" color="secondary" onClick={onRegister}>
          or Create New Account
        </Button>
      </div>
    </form>
  );
};

export default MenuLogin;
