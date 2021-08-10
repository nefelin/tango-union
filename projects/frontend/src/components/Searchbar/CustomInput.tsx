import { Clear } from '@material-ui/icons';
import { ChangeEvent, useRef, useState } from 'react';
import * as React from 'react';

import { Unary } from '../../types/utility/unary';
import { ClearButtonContainer, SearchInputContainer } from './styles';

interface Props {
  value: string;
  onChange: Unary<string | ChangeEvent<any>>;
  onClear: VoidFunction;
}

const CustomInput = ({ onChange, value, onClear })=> {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setFocus(true)
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const handleBlur = () => setFocus(false);

  return (
    <SearchInputContainer focus={focus} onBlur={handleBlur} onFocus={handleFocus} onMouseDown={handleFocus}>
      <input
        ref={inputRef}
        autoComplete="off"
        placeholder="Search..."
        id="text"
        {...{ value, onChange }}
      />
      <ClearButtonContainer onClick={onClear}>
        <Clear color="disabled" fontSize="small" />
      </ClearButtonContainer>
    </SearchInputContainer>
  );
};

export default CustomInput;
