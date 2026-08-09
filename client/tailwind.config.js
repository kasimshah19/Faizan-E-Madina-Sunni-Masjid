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
                primary: {
                    DEFAULT: '#0F5132',
                    light: '#1B7A4D',
                    dark: '#0A3D26',
                },
                accent: {
                    DEFAULT: '#C9A227',
                    light: '#E4C55E',
                },
                background: '#FAF7F0',
                surface: '#FFFFFF',
                'surface-alt': '#F3EFE4',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                arabic: ['Amiri', 'serif'],
            },
            borderRadius: {
                xl: '12px',
                '2xl': '16px',
            },
            boxShadow: {
                sm: '0 1px 2px rgba(15, 81, 50, 0.06)',
                md: '0 4px 12px rgba(15, 81, 50, 0.08)',
                lg: '0 10px 30px rgba(15, 81, 50, 0.12)',
                'glow-gold': '0 0 20px rgba(201, 162, 39, 0.25)',
            },
        },
    },
    plugins: [],
};
