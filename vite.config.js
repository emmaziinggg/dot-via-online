import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { CONTENT } from "./src/content.js";

// Chèn tiêu đề + mô tả từ src/content.js vào index.html lúc build,
// để link chia sẻ có preview mà chữ vẫn chỉ nằm ở content.js.
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const metaFromContent = () => ({
  name: "meta-from-content",
  transformIndexHtml(html) {
    const { title, description } = CONTENT.meta;
    return html
      .replace("<!--META_TITLE-->", `<title>${esc(title)}</title>`)
      .replace(
        "<!--META_TAGS-->",
        [
          `<meta name="description" content="${esc(description)}" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(description)}" />`,
          `<meta property="og:type" content="website" />`,
        ].join("\n    ")
      );
  },
});

export default defineConfig({
  // Đường dẫn tương đối: chạy được trên GitHub Pages với mọi tên repo.
  base: "./",
  plugins: [react(), metaFromContent()],
});
