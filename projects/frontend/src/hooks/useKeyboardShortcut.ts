import { useEffect} from 'react';

const useKeyboardShortcut = (keys: Array<string>, action: VoidFunction) => {

  const handleKeyDown = ({key}: KeyboardEvent) => {
    if (keys.includes(key)) {
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