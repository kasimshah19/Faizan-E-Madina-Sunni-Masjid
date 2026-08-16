/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    container: {
      center: true,

      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.25rem',
        '2xl': '2.5rem',
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },

    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
    },

    extend: {
      /* =========================
         COLORS
         ========================= */
      colors: {
        primary: {
          DEFAULT: '#0D6A4D',
          light: '#1E8968',
          dark: '#084432',

          50: '#EEF8F3',
          100: '#DDEFE7',
          200: '#BFE0D2',
          300: '#97CDB8',
          400: '#62B499',
          500: '#32987A',
          600: '#0D6A4D',
          700: '#0A5941',
          800: '#084432',
          900: '#063326',
        },

        accent: {
          DEFAULT: '#D7B557',
          light: '#F4E5B2',
          dark: '#A87C16',

          50: '#FFF9E9',
          100: '#FFF2C9',
          200: '#F9E6A4',
          300: '#EFD47B',
          400: '#E4C563',
          500: '#D7B557',
          600: '#C6A243',
          700: '#A87C16',
          800: '#806016',
          900: '#624C13',
        },

        background: '#F7F8F4',
        surface: '#FFFFFF',
        'surface-alt': '#EEF3EF',

        ink: '#163C31',
        muted: '#65736D',

        brand: {
          green: '#0D6A4D',
          'green-dark': '#083F30',
          gold: '#D7B557',
          cream: '#FFFDF7',
        },

        success: {
          50: '#ECFDF3',
          100: '#D1FAE5',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },

        danger: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },

        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },

        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },

      /* =========================
         FONTS
         ========================= */
      fontFamily: {
        heading: [
          'Poppins',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],

        body: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],

        arabic: [
          'Amiri',
          'Noto Naskh Arabic',
          'serif',
        ],

        display: [
          'Poppins',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },

      /* =========================
         FONT SIZES
         ========================= */
      fontSize: {
        'hero-sm': [
          '2.75rem',
          {
            lineHeight: '0.98',
            letterSpacing: '-0.03em',
          },
        ],

        'hero-md': [
          '4rem',
          {
            lineHeight: '0.96',
            letterSpacing: '-0.04em',
          },
        ],

        'hero-lg': [
          '5rem',
          {
            lineHeight: '0.93',
            letterSpacing: '-0.045em',
          },
        ],

        'hero-xl': [
          '6rem',
          {
            lineHeight: '0.91',
            letterSpacing: '-0.05em',
          },
        ],
      },

      /* =========================
         SPACING
         ========================= */
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },

      /* =========================
         MAX WIDTH
         ========================= */
      maxWidth: {
        content: '1320px',
        wide: '1480px',
        reading: '720px',
        prose: '760px',
      },

      /* =========================
         BORDER RADIUS
         ========================= */
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      /* =========================
         SHADOWS
         ========================= */
      boxShadow: {
        xs: '0 1px 3px rgba(15, 81, 50, 0.05)',
        sm: '0 8px 24px rgba(15, 81, 50, 0.06)',
        md: '0 16px 42px rgba(15, 81, 50, 0.09)',
        lg: '0 24px 65px rgba(15, 81, 50, 0.13)',

        card: '0 12px 40px rgba(15, 81, 50, 0.07)',
        'card-dark': '0 18px 48px rgba(0, 0, 0, 0.24)',

        'glow-gold': '0 0 24px rgba(215, 181, 87, 0.22)',
        'glow-green': '0 0 24px rgba(13, 106, 77, 0.18)',
      },

      /* =========================
         TRANSITIONS
         ========================= */
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      /* =========================
         Z INDEX
         ========================= */
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
      },

      /* =========================
         BACKGROUND GRADIENTS
         ========================= */
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #0A4E3B 0%, #0D6A4D 52%, #083F30 100%)',

        'gold-gradient':
          'linear-gradient(135deg, #D7B557 0%, #E7CB70 100%)',

        'soft-gradient':
          'linear-gradient(180deg, #FFFFFF 0%, #F7F8F4 100%)',
      },

      /* =========================
         KEYFRAMES
         ========================= */
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(16px)',
          },

          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        fadeIn: {
          '0%': {
            opacity: '0',
          },

          '100%': {
            opacity: '1',
          },
        },

        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.96)',
          },

          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },

        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },

          '50%': {
            transform: 'translateY(-6px)',
          },
        },
      },

      /* =========================
         ANIMATIONS
         ========================= */
      animation: {
        'fade-up':
          'fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both',

        'fade-in':
          'fadeIn 500ms ease-out both',

        'scale-in':
          'scaleIn 450ms cubic-bezier(0.22, 1, 0.36, 1) both',

        float:
          'float 3.5s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};