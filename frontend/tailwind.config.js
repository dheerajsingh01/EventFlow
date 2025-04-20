export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    extend: {
        spacing: {
            '18': '4.5rem',
          },
        colors: {
            primary: "#2C6975",
            secondary: "#68B2A0",
            accent: "#E37383",
            background: "#F5F5F5",
            darktext: "#333333",
        },
    },
};
export const plugins = [];