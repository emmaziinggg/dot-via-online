/** @type {import('tailwindcss').Config} */
export default {
  // hover chỉ có tác dụng trên máy có chuột, điện thoại không bị "kẹt hover"
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        giay: "#F5F0E6",
        sen: "#E6007E",
        lam: "#29A8E0",
        ma: "#12A150",
        cam: "#F7931E",
        nghe: "#FFD23F",
        tim: "#6A3D9A",
        son: "#D7263D",
        muc: "#2B1B3D", // màu chữ chính: tím than đậm, đỡ gắt hơn đen
      },
      fontFamily: {
        display: ['"Paytone One"', "system-ui", "sans-serif"],
        body: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
