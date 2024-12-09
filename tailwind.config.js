/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#bd3634",
                    200: "#cc3b39",
                },
                secondary: {
                    100: "#E6DCB1",
                    200: "#d4caa3",
                    300: "#bfb791",
                },
                text: {
                    100: "#f1f1f1",
                    200: "#a7a7a7",
                    black: "#0f0f0f",
                    dark: "#343230",
                },
                accent: {
                    100: "#CEAC5C",
                },
                background: {
                    100: "#0c0e10",
                },
            },
            screens: {
                xs: "320px",
                sm: "384px",
                md: "448px",
                lg: "512px",
                xl: "576px",
                "2xl": "672px",
                "3xl": "768px",
                "4xl": "896px",
                "5xl": "1024px",
                "6xl": "1152px",
                "7xl": "1280px",
            },
        },
    },
    plugins: [require("@tailwindcss/container-queries")],
};
