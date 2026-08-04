/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts,scss}"],
    theme: {
        extend: {
            keyframes: {
                circle: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                floatY: {
                    '0%': {transform: 'translateY(0px)'},
                    '50%': {transform: 'translateY(-20px)'},
                    '100%': {transform: 'translateY(0px)'}
                },
                sineSweep: {
                    '0%': { left: '-100%' },
                    '40%': { left: '150%' },
                    '100%': { left: '150%' }
                },
                lineShimmer: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                },
                blobFloat: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(20px, -30px) scale(1.05)' },
                    '66%': { transform: 'translate(-15px, 15px) scale(0.95)' }
                }
            },
            animation: {
                circle: 'circle 3s linear infinite',
                floatY: 'floatY 3s linear infinite',
                shineSweep: 'sineSweep 2s linear infinite',
                lineShimmer: 'lineShimmer 3s ease-in-out infinite',
                blobFloat: 'blobFloat 6s ease-in-out infinite'

            },
        },
    },
    plugins: [],
}