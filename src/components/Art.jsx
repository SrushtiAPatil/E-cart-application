import React, { useEffect, useState } from 'react';

const G = '#b08650';
const SW = '#a9bfd6';

function Drawing({ cat }) {
  switch (cat) {
    case 'rings':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="62" r="26" fill="none" stroke={G} strokeWidth="8" />
          <path d="M50 14 L64 28 L50 42 L36 28 Z" fill="#dbe6f1" stroke={SW} strokeWidth="3" />
        </svg>
      );
    case 'necklaces':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M14 22 Q50 90 86 22" fill="none" stroke={G} strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="62" x2="50" y2="68" stroke={G} strokeWidth="3" />
          <ellipse cx="50" cy="78" rx="8" ry="11" fill="#f7f0e4" stroke={G} strokeWidth="2.5" />
        </svg>
      );
    case 'earrings':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {[28, 64].map((x) => (
            <g key={x}>
              <path d={`M${x + 4} 14 q8 0 8 10`} fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" />
              <path d={`M${x} 34 h16 l5 24 h-26 z`} fill={G} />
              <circle cx={x + 4} cy="68" r="3" fill={G} />
              <circle cx={x + 14} cy="68" r="3" fill={G} />
            </g>
          ))}
        </svg>
      );
    case 'bracelets':
    default:
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <ellipse cx="50" cy="52" rx="38" ry="22" fill="none" stroke={G} strokeWidth="8" />
          {[26, 38, 50, 62, 74].map((x) => (
            <circle key={x} cx={x} cy={x === 50 ? 31 : x === 38 || x === 62 ? 33 : 38} r="2.6" fill="#fff" />
          ))}
        </svg>
      );
  }
}

export default function Art({ cat, src, alt = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (src && !failed) {
    return (
      <img
        className="art-img"
        src={import.meta.env.BASE_URL + src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <Drawing cat={cat} />;
}
