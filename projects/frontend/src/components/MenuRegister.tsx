import React, { FormEventHandler, useState } from 'react';

import { useWhoAmIQuery } from '../../generated/graphql';
import { handleRegister } from '../auth';

const emailRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

const MenuRegister = ({
  onLogin,
  onRegister,
  onCancel,
}: {
  onCancel: VoidFunction;
  onLogin: VoidFunction;
  onRegister: VoidFunction;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const { refetch } = useWhoAmIQuery();

  const emailValid = emailRegex.test(email);
  const canSubmit =
    emailValid &&
    password &&
    passwordConfirm &&
    password.length >= 16 &&
    !submitting;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const register = await handleRegister(
      firstName,
      lastName,
      email,
      passwordConfirm,
    );
    setSubmitting(false);
    if (register) {
      await refetch();
      onRegister();
    } else {
      setError('Problem creating account!');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full text-2xl text-center">Create Account</div>
      <div className="flex flex-col gap-y-4 mt-6">
        <label>
          <div>First Name</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="First Name"
            value={firstName}
            onInput={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <label>
          <div>Last Name</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Last Name"
            value={lastName}
            onInput={(e) => setLastName(e.currentTarget.value)}
          />
        </label>

        <label>
          <div>Email</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
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
        <label>
          <div>Confirm Password</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirm}
            onInput={(e) => setPasswordConfirm(e.currentTarget.value)}
          />
        </label>
        {error && (
          <div className="bg-red-400 text-white font-bold rounded-lg py-2 px-6">
            {error}
          </div>
        )}
        <div className="flex w-full justify-between">
          <button type="button" className="p-2 text-blue-500" onClick={onLogin}>
            Login
          </button>
          <button
            className="p-2 sm:hidden rounded-lg border border-black"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            className="p-2 rounded-lg bg-blue-500 disabled:bg-blue-300"
            type="submit"
          >
            {submitting ? 'spinner' : 'Create Account'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MenuRegister;
