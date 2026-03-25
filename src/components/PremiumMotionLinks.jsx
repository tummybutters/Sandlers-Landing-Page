import { useCallback, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RollingNavLink({ href, label }) {
  return (
    <a href={href} className="company-nav-link">
      <span className="company-nav-link-fill" aria-hidden="true" />
      <span className="company-nav-link-label">
        <span className="company-nav-link-track">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
    </a>
  );
}

export function MagneticFlightLink({ to, href, label, variant = 'butter', className = '' }) {
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const handleMouseMove = useCallback((event) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 100;
    const maxMove = 12;

    if (distance < maxDistance) {
      const factor = 1 - distance / maxDistance;
      setPosition({
        x: distanceX * factor * (maxMove / maxDistance),
        y: distanceY * factor * (maxMove / maxDistance),
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsHovered(true);
    setIsReturning(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsReturning(true);
    setPosition({ x: 0, y: 0 });

    timeoutRef.current = window.setTimeout(() => {
      setIsReturning(false);
    }, 800);
  }, []);

  const sharedProps = {
    ref: buttonRef,
    className: `company-flight-link company-flight-link--${variant} ${className}`.trim(),
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.04 : 1})`,
      transition: isReturning
        ? 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1), background 300ms ease, box-shadow 300ms ease'
        : 'transform 150ms ease-out, background 300ms ease, box-shadow 300ms ease',
    },
  };

  const content = (
    <>
      <span className="company-flight-copy">
        <span
          className="company-flight-copy-track"
          style={{
            transform: isHovered ? 'translateY(-50%)' : 'translateY(0)',
            transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>

      <span
        className="company-flight-icon-wrap"
        style={{
          transform: isHovered ? 'rotate(45deg) translateX(6px)' : 'rotate(0deg) translateX(0)',
          transition: isHovered
            ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
            : 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <ArrowRight
          size={16}
          className="company-flight-icon"
          style={{
            transform: isHovered ? 'rotate(-45deg)' : 'rotate(0deg)',
            transition: isHovered
              ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
              : 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
        <span
          className="company-flight-flash"
          style={{
            opacity: isHovered ? 0 : 0,
            transform: isHovered ? 'scale(1.5)' : 'scale(1)',
            transition: 'opacity 200ms ease, transform 400ms ease',
            transitionDelay: isHovered ? '150ms' : '0ms',
          }}
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...sharedProps}>
      {content}
    </a>
  );
}
