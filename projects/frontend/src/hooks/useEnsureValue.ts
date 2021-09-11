import { useEffect, useState } from 'react';

function useEnsureValue<Value>(value: Value, fallback = undefined ){
  const [retained, setRetained] = useState<Value | typeof fallback>(fallback);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setRetained(value)
    }
  }, [value])

  return retained;
}

export default useEnsureValue;