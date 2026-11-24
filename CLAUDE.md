# Đốt Vía Online — Quy tắc dự án

## Quy trình (BẮT BUỘC)
- Mọi yêu cầu có viết/sửa code: vào Plan Mode, trình bày kế hoạch bằng **tiếng Việt**, chờ duyệt rồi mới code.
- Giao tiếp, comment, commit message: tiếng Việt.

## Tech Stack
- Web tĩnh: Vite + React + Tailwind CSS + Framer Motion. Không backend, không API server, không lưu dữ liệu ngoài `localStorage`.
- Deploy GitHub Pages: đặt `base` trong `vite.config.js` theo tên repo, dùng `HashRouter` (nếu có router), asset để trong `public/` hoặc import tương đối.
- Build ra `dist/`, deploy bằng GitHub Actions (`actions/deploy-pages`).

## Art Direction — Dân gian Việt đương đại (theo `ref-01.jpg`)
- Chất liệu in risograph: nền giấy ngà có vân (`#F5F0E6`), hạt halftone, lệch màu in (misregistration) nhẹ.
- Bảng màu rực, bão hoà: hồng sen `#E6007E`, xanh lam `#29A8E0`, xanh lá mạ `#12A150`, cam `#F7931E`, vàng nghệ `#FFD23F`, tím `#6A3D9A`, đỏ son `#D7263D`. Ít đen, không gradient kiểu "app".
- Hoạ tiết: hoa văn dày đặc (hoa cúc, sen, mây) ở mảng trên; mái đình cong, đầu đao; nhân vật phẳng tí hon kiểu đám rước lễ hội.
- Bố cục: hoạ tiết dày ↔ khoảng trắng rộng; typography nhỏ, biên tập (editorial) xen headline đậm, có cá tính.
- Chuyển động (Framer Motion): đung đưa cờ phướn, hoa văn trôi chậm, nhân vật nhún nhảy, hiệu ứng "đốt" (lửa, khói, tàn giấy bay). Tôn trọng `prefers-reduced-motion`.
- Mobile-first, chạm bấm dễ, tương phản chữ đạt chuẩn đọc được.

## Tone & Voice
- **Headline chính** (tiêu đề trang, tiêu đề từng phần, tiêu đề thẻ Vía Lành): CHỈ viết bằng skill `/vn-wordplay-copywriter`.
- **Mọi chữ còn lại** (mô tả, hướng dẫn, nút bấm, thông báo, lỗi): vui, hài, tự nhiên kiểu nói nhảm bắt trend MXH Việt hiện tại; lồng ghép vận xui, đốt vía / đốt phong long, xả xui, lấy may / điềm lành.
- Hài nhưng không phản cảm, không mê tín cực đoan, không xúc phạm tín ngưỡng.

## Kiến trúc nội dung
- TUYỆT ĐỐI không hardcode chữ hiển thị trong component (kể cả `alt`, `aria-label`, `title`, placeholder).
- Toàn bộ text nằm trong **một file duy nhất `src/content.js`**, chia nhóm theo trang/phần, mỗi nhóm có chú thích tiếng Việt (`// Phần X: dùng ở đâu, lưu ý gì`) để chủ dự án tự mở ra sửa.
- Component chỉ `import content from './content'` rồi đọc key; thêm text mới = thêm key vào `content.js` trước.
