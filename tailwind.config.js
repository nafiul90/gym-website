/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: "1rem" },
            screens: { xl: "1142px" },
        },
        extend: {
            fontFamily: {
                sora: ["var(--font-sora)"],
                teko: ["var(--font-teko)"],
            },
            colors: {
                "primary-dark": {
                    700: "#1F1F1F",
                    800: "#1A1A1A",
                    900: "#0F0F0F",
                },
                "primary-bright": {
                    100: "#FFFFFF",
                    200: "#808080",
                    300: "#666666",
                },
            },
            screens: {
                "3xs": "352px",
                "2xs": "384px",
                xs: "448px",
                sm: "576px",
            },
            animation: {
                "spin-slow": "spin 2s linear infinite",
            },
        },
    },
    plugins: [],
};
