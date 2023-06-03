import { Button } from '@mui/material';
import React, { FormEventHandler, useState } from 'react';

import { useWhoAmIQuery } from '../../generated/graphql';
import { handleRegister } from '../auth';

export const emailRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
export const passwordValid = (password: string) => password.length >= 16;

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
  const [errors, setErrors] = useState<
    Partial<Record<'request' | 'password' | 'email', string>>
  >({});
  const { refetch } = useWhoAmIQuery();

  const emailValid = emailRegex.test(email);
  const canSubmit =
    emailValid &&
    password &&
    passwordConfirm &&
    passwordValid(password) &&
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
      setErrors((prev) => ({ ...prev, request: 'Problem creating account!' }));
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
            onInput={(e) => {
              setErrors((prev) => ({ ...prev, email: '' }));
              setEmail(e.currentTarget.value);
            }}
            onBlur={() =>
              email.length && !emailRegex.test(email) &&
              setErrors((prev) => ({ ...prev, email: 'Email is invalid' }))
            }
          />
        </label>
        <label>
          <div>Password</div>
          <input
            className="p-2 rounded-md w-full"
            placeholder="Password"
            type="password"
            value={password}
            onInput={(e) => {
              setErrors((prev) => ({ ...prev, password: '' }));
              setPassword(e.currentTarget.value);
            }}
            onBlur={() =>
              password.length &&
              !passwordValid(password) &&
              setErrors((prev) => ({
                ...prev,
                password: 'Password must be at least 16 characters',
              }))
            }
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
        {Object.values(errors).map(
          (errorText) =>
            errorText && (
              <div
                key={errorText}
                className="bg-red-400 text-white font-bold rounded-lg py-2 px-6"
              >
                {errorText}
              </div>
            ),
        )}
        <div className="flex w-full justify-between mt-4">
          <Button
            variant="outlined"
            className="p-2 sm:hidden rounded-lg border border-black"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!canSubmit}
            className="p-2 rounded-lg bg-blue-500 disabled:bg-blue-300"
            type="submit"
          >
            {submitting ? 'spinner' : 'Create Account'}
          </Button>
        </div>
        <Button color="secondary" type="button" onClick={onLogin}>
          Login instead
        </Button>
      </div>
    </form>
  );
};

export default MenuRegister;
