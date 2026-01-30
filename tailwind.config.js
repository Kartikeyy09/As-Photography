/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Dark theme colors from your index.css
                background: '#0f0f0f',
                surface: '#1a1a1a',      // Was 'secondary' in your CSS
                foreground: '#ffffff',
                text: '#e5e5e5',        // A slightly off-white for text
                accent: '#c59d5f',      // Your richer gold from original config
                accent_hover: '#b08b55',
                border: '#333333',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif'],
            },
            letterSpacing: {
                widest: '.3em',
            }
        },
    },
    plugins: [],
};