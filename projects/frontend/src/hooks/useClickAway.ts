import React, { useEffect } from 'react';

interface Props {
  ref: React.MutableRefObject<any>;
  onBlur?: VoidFunction;
  onFocus?: VoidFunction;
}

const usePseudoFocus = ({ ref, onBlur, onFocus }: Props) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current ) {
        if (e.target instanceof Node && ref.current.contains(e.target)) {
          onFocus?.();
        } else {
          onBlur?.();
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  });
};

export default usePseudoFocus;
