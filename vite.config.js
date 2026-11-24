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
    const { title, description, url, image } = CONTENT.meta;
    const imageUrl = new URL(image, url).href; // mạng xã hội cần đường dẫn ảnh đầy đủ
    return html
      .replace("<!--META_TITLE-->", `<title>${esc(title)}</title>`)
      .replace(
        "<!--META_TAGS-->",
        [
          `<meta name="description" content="${esc(description)}" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(description)}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:url" content="${esc(url)}" />`,
          `<meta property="og:image" content="${esc(imageUrl)}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(title)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:image" content="${esc(imageUrl)}" />`,
        ].join("\n    ")
      );
  },
});

export default defineConfig({
  // Đường dẫn tương đối: chạy được trên GitHub Pages với mọi tên repo.
  base: "./",
  plugins: [react(), metaFromContent()],
});
