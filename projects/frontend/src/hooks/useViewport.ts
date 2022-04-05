import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  // Add a second state variable "height" and default it to the current window height
  const [height, setHeight] = useState(window.innerHeight);
  const [vh, setVh] = useState(window.innerHeight/100)
  document.documentElement.style.setProperty('--vh', `${vh}px`) // sets the --vh css var to a _real_ version of VH

 const asVh = (targetVh: number) => `${targetVh * vh}px`
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      // Set the height in state as well as the width
      setHeight(window.innerHeight);
      setVh(window.innerHeight/100)
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Return both the height and width
  return { width, height, vh, asVh};
};

export const asVh = (vhs: number) => `calc(var(--vh) * ${vhs})`

export default useViewport;