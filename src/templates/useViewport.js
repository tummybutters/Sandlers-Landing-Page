import { useEffect, useState } from 'react';

function getWidth() {
  if (typeof window === 'undefined') {
    return 1280;
  }

  return window.innerWidth;
}

export default function useViewport() {
  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width < 640,
    isTablet: width < 960,
  };
}
