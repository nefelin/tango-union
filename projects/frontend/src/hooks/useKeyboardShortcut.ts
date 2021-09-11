import { useEffect} from 'react';

const useKeyboardShortcut = (keys: Array<string>, action: VoidFunction,  modifiers?: Array<'meta' | 'shiftKey'>, preventDefault?: boolean) => {

  const handleKeyDown = (e: KeyboardEvent) => {
    const {key, metaKey, shiftKey} = e;
    let modifiersSatisfied = true;

    if (modifiers?.includes('meta') && !metaKey) {
      modifiersSatisfied = false;
    }
    if (modifiers?.includes('shiftKey') && !shiftKey) {
      modifiersSatisfied = false;
    }

    if (keys.includes(key) && modifiersSatisfied) {
      if (preventDefault) {
        e.preventDefault()
      }
      action()
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
}

export default useKeyboardShortcut;