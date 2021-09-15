import React, {
  createContext,
  FunctionComponent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Unary } from '../types/utility/unary';
import { reactiveSongLists } from './state/useGlobalPlaylistState/songLists.state';

export const useFocusable = (ref: MutableRefObject<any>, id: string) => {
  const { getRefs, setRefs } = useContext(FocusContext);
  useEffect(() => {
    const newRefs = [...getRefs().slice(), { id, ref }];
    setRefs(newRefs);
    return () => {
      setRefs(getRefs().filter(({ id: registered }) => registered !== id));
    };
  }, [id]);
};

interface RegisteredFocusable {
  id: string;
  ref: MutableRefObject<any>;
}

interface FocusContextInterface {
  getRefs: () => Array<RegisteredFocusable>;
  focused: string | null;
  setFocused: Unary<string | null>;
  setRefs: Unary<Array<RegisteredFocusable>>;
}

const initFocusState: FocusContextInterface = {
  getRefs: () => [],
  focused: null,
  setRefs: () => {},
  setFocused: () => {},
};

export const FocusContext = createContext(initFocusState);

export const FocusableContext: FunctionComponent = ({ children }) => {
  const [focused, setFocused] =
    useState<FocusContextInterface['focused']>(null);

  const refs = useRef<Array<RegisteredFocusable>>([]);
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      let clickedId: string | null = null;
      for (const { ref, id } of refs.current) {
        if (ref.current) {
          if (e.target instanceof Node && ref.current.contains(e.target)) {
            clickedId = id;
          }
        }
      }
      setFocused(clickedId);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  });

  return (
    <FocusContext.Provider
      value={{
        setFocused,
        setRefs: (newRefs) => (refs.current = newRefs),
        focused,
        getRefs: () => refs.current,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
