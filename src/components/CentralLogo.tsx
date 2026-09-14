import React from 'react';

interface CentralLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const CentralLogo: React.FC<CentralLogoProps> = ({
  className = '',
  variant = 'color',
  showSubtitle = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Primary brand colors from the official logo
  const navyColor = isLight ? '#FFFFFF' : '#0B192C';
  const orangeColor = '#FF5400';
  const subtextColor = isLight ? '#E2E8F0' : '#0B192C';
  const secondaryNavy = isLight ? '#FFFFFF' : '#0B192C';

  const sizeClasses = {
    sm: 'h-9 sm:h-10 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-24 sm:h-28 w-auto',
    full: 'w-full h-auto',
  };

  return (
    <div className={`inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 680 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} max-w-full`}
        style={{ overflow: 'visible' }}
        aria-label="CENTRAL Transporte Logística y Paqueteria"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@1,900&family=Montserrat:wght@800;900&display=swap');
              .logo-title-navy {
                font-family: 'Plus Jakarta Sans', 'Montserrat', 'Arial Black', sans-serif;
                font-style: italic;
                font-weight: 900;
                fill: ${navyColor};
              }
              .logo-title-orange {
                font-family: 'Plus Jakarta Sans', 'Montserrat', 'Arial Black', sans-serif;
                font-style: italic;
                font-weight: 900;
                fill: ${orangeColor};
              }
              .logo-subtitle {
                font-family: 'Montserrat', 'Plus Jakarta Sans', Arial, sans-serif;
                font-weight: 900;
                letter-spacing: 0.14em;
                fill: ${subtextColor};
              }
            `}
          </style>
        </defs>

        {/* 1. Main Brand Text: "CEN" (Navy) + "T" (Orange) + "RAL" (Navy) */}
        <g transform="translate(48, 120)">
          {/* CEN */}
          <text
            x="0"
            y="0"
            fontSize="108"
            className="logo-title-navy"
            letterSpacing="-0.02em"
          >
            CEN
          </text>

          {/* T (Vibrant Orange) */}
          <text
            x="248"
            y="0"
            fontSize="108"
            className="logo-title-orange"
            letterSpacing="-0.02em"
          >
            T
          </text>

          {/* RAL */}
          <text
            x="320"
            y="0"
            fontSize="108"
            className="logo-title-navy"
            letterSpacing="-0.02em"
          >
            RAL
          </text>
        </g>

        {/* 2. Subtitle: "TRANSPORTE LOGÍSTICA Y PAQUETERIA" */}
        {showSubtitle && (
          <g transform="translate(52, 148)">
            <text
              x="0"
              y="0"
              fontSize="20.5"
              className="logo-subtitle"
            >
              TRANSPORTE LOGÍSTICA Y PAQUETERIA
            </text>
          </g>
        )}

        {/* 3. Dual Underline Bar */}
        <g transform="translate(52, 160)">
          {/* Orange Top Stripe */}
          <rect
            x="0"
            y="0"
            width="460"
            height="7.5"
            rx="0.5"
            fill={orangeColor}
          />
          {/* Navy Bottom Thin Line */}
          <rect
            x="0"
            y="9"
            width="460"
            height="2.5"
            fill={secondaryNavy}
          />
        </g>

        {/* 4. Falcon / Eagle Mascot + Aerodynamic Swooshing Trails */}
        <g transform="translate(460, 15)">
          {/* Falcon Head & Sharp Beak */}
          <path
            d="M 120 40 C 132 38 148 44 158 50 C 158 56 150 63 146 64 C 141 65 140 60 137 57 C 133 55 125 56 118 58 C 114 59 110 59 106 58 C 113 54 122 51 127 46 Z"
            fill={navyColor}
          />
          {/* Beak Upper Ridge & Hook */}
          <path
            d="M 132 40 C 145 42 156 48 160 52 C 160 58 152 64 148 65 C 150 60 148 54 142 50 C 138 47 132 44 126 43 Z"
            fill={navyColor}
          />

          {/* Eye */}
          <circle cx="126" cy="46" r="3.5" fill={isLight ? '#0B192C' : '#FFFFFF'} />
          <circle cx="127" cy="45.5" r="1.8" fill={navyColor} />

          {/* Head Crown & Neck Quills */}
          <path
            d="M 116 34 C 104 36 90 44 76 52 C 86 51 98 48 108 44 C 92 50 78 60 66 69 C 78 66 92 62 102 56 C 88 64 74 76 60 88 C 74 82 90 76 100 68 C 84 78 70 94 56 108 C 70 100 86 92 98 82 Z"
            fill={navyColor}
          />

          {/* Upper Wing & Trailing Feathers (Spikes pointing back left) */}
          <path
            d="M 108 34 C 88 38 60 48 38 52 C 54 50 76 45 94 40 C 72 48 48 58 28 66 C 44 63 66 56 86 50 C 62 60 38 74 18 86 C 36 80 58 72 78 64 C 54 76 30 92 12 106 C 32 98 56 88 74 78 Z"
            fill={navyColor}
          />

          {/* Wing Feather Cluster 2 */}
          <path
            d="M 95 62 C 70 74 44 90 20 105 C 40 96 66 85 88 74 C 64 88 38 106 14 124 C 36 114 62 102 84 90 Z"
            fill={navyColor}
          />

          {/* Dynamic Aerodynamic Lines Underneath the Entire Logo */}
          {/* Main primary swooshing streamline sweeping to the far bottom-left */}
          <path
            d="M 152 75 C 130 115 100 160 60 185 C 10 215 -70 205 -150 185 C -230 165 -320 178 -400 205 C -340 188 -250 174 -160 188 C -80 200 0 204 48 178 C 82 155 110 115 130 80 Z"
            fill={navyColor}
          />

          {/* Secondary parallel streamline */}
          <path
            d="M 142 90 C 122 130 88 172 45 194 C -5 218 -75 208 -145 192 C -215 178 -300 190 -370 212 C -310 196 -230 185 -150 196 C -80 206 -5 208 35 186 C 72 165 104 125 122 92 Z"
            fill={navyColor}
          />

          {/* Third delicate trailing breeze line */}
          <path
            d="M 125 110 C 105 145 75 180 30 200 C -15 220 -80 210 -140 198 C -200 186 -270 198 -330 216 C -280 204 -210 194 -145 202 C -85 210 -20 212 22 194 C 60 174 90 140 108 112 Z"
            fill={navyColor}
          />
        </g>
      </svg>
    </div>
  );
};
