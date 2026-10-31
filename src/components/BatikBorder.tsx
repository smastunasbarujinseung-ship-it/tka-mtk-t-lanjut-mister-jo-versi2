import React from 'react';

/**
 * Subtle Indonesian Batik Ornament Borders (Parang & Kawung geometric motifs)
 * Very thin, crisp, aesthetic, low opacity (< 0.10) to respect concentration while preserving national identity.
 */
export const BatikBorder: React.FC = () => {
  return (
    <>
      {/* Left side batik column */}
      <div
        className="fixed top-0 bottom-0 left-0 w-8 lg:w-12 pointer-events-none z-0 hidden sm:block opacity-[0.06] select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full text-blue-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 48 800"
          preserveAspectRatio="none"
        >
          <pattern
            id="batik-kawung"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Kawung intersecting circles */}
            <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="0" cy="0" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="48" cy="0" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="0" cy="48" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="48" cy="48" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
            <path
              d="M 12 12 Q 24 24 36 12 Q 24 24 36 36 Q 24 24 12 36 Q 24 24 12 12"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
          </pattern>
          <rect width="48" height="800" fill="url(#batik-kawung)" />
        </svg>
      </div>

      {/* Right side batik column */}
      <div
        className="fixed top-0 bottom-0 right-0 w-8 lg:w-12 pointer-events-none z-0 hidden sm:block opacity-[0.06] select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full text-blue-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 48 800"
          preserveAspectRatio="none"
        >
          <pattern
            id="batik-parang"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 48 L 48 0 M 12 48 L 48 12 M 0 36 L 36 0"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="32" cy="32" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
          </pattern>
          <rect width="48" height="800" fill="url(#batik-parang)" />
        </svg>
      </div>
    </>
  );
};
