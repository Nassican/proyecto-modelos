// components/ShapeSeparator.js
import React from 'react';

import styles from './ShapeSeparator.module.css';

const ShapeSeparator = ({ colorG }: { colorG?: string }) => {
  const colorGradient = `#${colorG}`;

  return (
    <div className={styles.shapeSeparator}>
      <svg viewBox="15.384 49.713 287.942 38.619" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: colorGradient, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M 13.384 49.713 L 304.326 49.713 L 304.326 69.946 L 303.33 69.946 L 292.095 88.253 L 280.861 69.946 L 279.058 69.946 L 267.775 88.332 L 256.493 69.946 L 255.028 69.946 L 243.825 88.202 L 232.623 69.946 L 230.757 69.946 L 219.506 88.281 L 208.254 69.946 L 206.081 69.946 L 194.864 88.225 L 183.648 69.946 L 181.81 69.946 L 170.544 88.304 L 159.279 69.946 L 157.78 69.946 L 146.594 88.174 L 135.409 69.946 L 133.408 69.946 L 122.275 88.089 L 111.141 69.946 L 109.851 69.946 L 98.675 88.157 L 87.5 69.946 L 85.579 69.946 L 74.355 88.236 L 63.132 69.946 L 61.549 69.946 L 50.405 88.106 L 39.262 69.946 L 37.278 69.946 L 26.086 88.185 L 14.893 69.946 L 13.384 69.946 Z"
          transform="matrix(0.9999999999999999, 0, 0, 1, -1.4210854715202004e-14, 0)"
          fill="url(#gradient)" // Relleno con gradiente
        />
      </svg>
    </div>
  );
};

export default ShapeSeparator;
