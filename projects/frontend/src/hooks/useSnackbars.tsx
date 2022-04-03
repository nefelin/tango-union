import { makeVar, useReactiveVar } from '@apollo/client';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { ReactElement, ReactNode } from 'react';

export interface SnackbarMessage {
  content: ReactNode;
  duration?: number;
  severity: AlertColor;
}

const DEFAULT_DURATION = 4000;

type SnackWithId = SnackbarMessage & { id: string };

const reactiveSnackbars = makeVar<Array<SnackWithId>>([]);

const useSnackbars = () => {
  const snacks = useReactiveVar(reactiveSnackbars);

  const addSnack = (newSnack: SnackbarMessage) => {
    const withId = { ...newSnack, id: nanoid(4) };
    reactiveSnackbars([...snacks, withId]);
  };

  const removeSnack = (removeId: string) =>
    reactiveSnackbars(snacks.filter(({ id }) => id !== removeId));

  const snackStack = (
    <>
      {snacks.map((snack) => (
        <Snackbar
          open={true}
          autoHideDuration={snack.duration || DEFAULT_DURATION}
          key={snack.id}
          onClose={() => removeSnack(snack.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={snack.severity}
            onClose={() => removeSnack(snack.id)}
          >
            {snack.content}
          </Alert>
        </Snackbar>
      ))}
    </>
  );

  return {
    snackStack,
    addSnack,
  };
};

export default useSnackbars;
