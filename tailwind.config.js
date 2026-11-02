/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FBF9F4',
          200: '#F5F2E9',
          300: '#EBE5D8',
          400: '#DED6C4',
        },
        midnight: {
          DEFAULT: '#0B0A0F',
          surface: '#121118',
          card: '#181622',
          light: '#222030',
          border: '#2C293E',
        },
        neonLime: {
          DEFAULT: '#CCFF00',
          hover: '#BAEA00',
          light: '#E2FF66',
          dark: '#99CC00',
          subtle: '#F6FFE0',
          glow: 'rgba(204, 255, 0, 0.45)',
        },
        brand: {
          purple: {
            DEFAULT: '#55348A',
            dark: '#3A1E65',
            light: '#724DB0',
            subtle: '#F3E8FF',
          },
          orange: {
            DEFAULT: '#F15E21',
            hover: '#D94E15',
            light: '#FF7A45',
            subtle: '#FFF1EB',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'lime-sm': '0 0 12px -2px rgba(204, 255, 0, 0.4)',
        'lime': '0 0 24px -4px rgba(204, 255, 0, 0.55)',
        'lime-lg': '0 0 40px -6px rgba(204, 255, 0, 0.7)',
        'midnight-sm': '2px 2px 0px 0px #0B0A0F',
        'midnight': '4px 4px 0px 0px #0B0A0F',
        'midnight-lg': '6px 6px 0px 0px #0B0A0F',
        'glass': '0 8px 32px 0 rgba(11, 10, 15, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '70%': { transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        popOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.94)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px -2px rgba(204, 255, 0, 0.4)' },
          '50%': { boxShadow: '0 0 25px 4px rgba(204, 255, 0, 0.7)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        flowIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float3D: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(4deg) rotateY(-4deg)' },
          '50%': { transform: 'translateY(-10px) rotateX(-4deg) rotateY(4deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out forwards',
        fadeOut: 'fadeOut 0.25s ease-in forwards',
        fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInDown: 'fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInLeft: 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInRight: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInDown: 'slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInUp: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        popIn: 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        popOut: 'popOut 0.25s ease-in forwards',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
        flowIn: 'flowIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float3D: 'float3D 6s ease-in-out infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        glowPulse: 'glowPulse 3.5s ease-in-out infinite',
        spinSlow: 'spinSlow 20s linear infinite',
        bounceSubtle: 'bounceSubtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
