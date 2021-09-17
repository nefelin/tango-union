import { useEffect, useState } from 'react';

function useEnsureValue<Value, Fallback>(value: Value, fallback: Fallback ) : NonNullable<Value> | Fallback{
  const [retained, setRetained] = useState<Value | Fallback>(fallback);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setRetained(value)
    }
  }, [value])

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return retained as NonNullable<Value> | Fallback;
}

export default useEnsureValue;