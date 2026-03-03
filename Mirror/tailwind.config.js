/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                page: '#0F0F14',
                card: '#1A1A24',
                accent: '#7C6FF7',
                accentGlow: '#9F99FC',
                emotional: '#F97066',
                habitual: '#6CE9A6',
                fatigue: '#FDB022',
                intentional: '#53B1FD',
                muted: '#6B7280',
                border: '#2D2D3D',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
