# Agent Manager

Giao diện quản lý Agent/Skill/Command/Plugin/MCP Server cho Claude Code, build bằng React + Vite + Tailwind CSS v4.

> Lưu ý: đây là bản UI dùng **dữ liệu mẫu** (xem các mảng ở đầu file `src/App.jsx`) để khớp với giao diện gốc. Muốn đọc/ghi cấu hình thật từ `~/.claude` thì cần thêm một backend nhỏ để expose dữ liệu qua API rồi gọi từ đây.

## Chạy thử ở máy local

Yêu cầu Node.js 20.19+ (hoặc 22.12+).

```bash
npm install
npm run dev
```

Mở địa chỉ mà terminal in ra (mặc định `http://localhost:5173`).

Build bản production:

```bash
npm run build
npm run preview   # xem thử bản build
```

## Đưa lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

(Thay `<username>/<repo-name>` bằng repo GitHub anh đã tạo.)

## Deploy bằng Vercel

1. Vào [vercel.com](https://vercel.com) → **Add New... → Project**.
2. Chọn repo GitHub vừa push.
3. Vercel tự nhận diện đây là project Vite — Framework Preset: **Vite**, Build Command: `npm run build` (hoặc `vite build`), Output Directory: `dist`. Thường không cần chỉnh gì thêm.
4. Bấm **Deploy** là xong.

Sau này mỗi lần push lên nhánh `main`, Vercel sẽ tự build và deploy lại.

## Cấu trúc project

```
├── index.html
├── package.json
├── vite.config.js        # plugin React + Tailwind v4
├── src/
│   ├── main.jsx           # entry point
│   ├── index.css          # @import "tailwindcss" + font Inter
│   └── App.jsx            # toàn bộ UI (theme tokens, mock data, các trang)
```
