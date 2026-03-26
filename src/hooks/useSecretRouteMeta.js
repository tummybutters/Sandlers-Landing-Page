import { useEffect } from 'react';

export default function useSecretRouteMeta(title) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobotsMeta = document.querySelector('meta[name="robots"]');
    const robotsMeta = existingRobotsMeta || document.createElement('meta');
    const previousRobotsContent = robotsMeta.getAttribute('content');

    document.title = title;

    if (!existingRobotsMeta) {
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = previousTitle;

      if (previousRobotsContent) {
        robotsMeta.setAttribute('content', previousRobotsContent);
      } else if (existingRobotsMeta) {
        robotsMeta.removeAttribute('content');
      } else {
        robotsMeta.remove();
      }
    };
  }, [title]);
}
