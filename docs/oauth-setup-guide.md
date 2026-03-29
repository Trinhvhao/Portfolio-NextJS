# OAuth Setup Guide (Google + GitHub)

Tài liệu này hướng dẫn lấy OAuth credentials và cấu hình cho dự án Next.js đang dùng Auth.js (next-auth).

## 1. Tạo file môi trường

Trong root project, tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

Sinh `NEXTAUTH_SECRET`:

```bash
openssl rand -hex 32
```

Dán vào `.env.local`:

```env
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## 2. Cấu hình GitHub OAuth

1. Mở GitHub Developer Settings:
   - https://github.com/settings/developers
2. Chọn OAuth Apps -> New OAuth App.
3. Điền thông tin:
   - Application name: tên bất kỳ (ví dụ `aayushbharti-nextjs-recode-local`)
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Tạo app -> lấy `Client ID`.
5. Generate a new client secret -> lấy `Client Secret`.
6. Gán vào `.env.local`:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 3. Cấu hình Google OAuth

1. Mở Google Cloud Console:
   - https://console.cloud.google.com/
2. Tạo project mới (hoặc dùng project có sẵn).
3. Vào APIs & Services -> OAuth consent screen:
   - Chọn External (nếu cần)
   - Điền app name, email, developer contact
   - Với chế độ Testing: thêm email của bạn vào Test users
4. Vào APIs & Services -> Credentials -> Create Credentials -> OAuth client ID.
5. Chọn Application type: Web application.
6. Cấu hình:
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Tạo credential -> lấy `Client ID` và `Client Secret`.
8. Gán vào `.env.local`:

```env
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 4. Khởi động lại server

Sau khi đổi env, luôn restart dev server:

```bash
npm run dev
```

## 5. Kiểm tra nhanh

1. Mở trang Guestbook.
2. Nếu cấu hình đúng, sẽ thấy nút:
   - Continue with GitHub
   - Continue with Google
3. Đăng nhập thành công sẽ hiện:
   - Tên user
   - Ảnh đại diện

## 6. Troubleshooting

### Lỗi: `OAuth is not configured yet. Add provider keys in .env.local.`

Nguyên nhân thường gặp:
1. Chưa điền credentials trong `.env.local`.
2. Đặt sai tên biến môi trường.
3. Điền rồi nhưng chưa restart server.

Checklist:
1. Kiểm tra đúng 4 biến:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
2. Kiểm tra callback URL khớp 100% trên provider.
3. Restart `npm run dev`.

### Lỗi: `[next-auth][error][CLIENT_FETCH_ERROR] Unexpected token '<'`

Đây là dấu hiệu endpoint auth trả HTML error thay vì JSON.

Các bước xử lý:
1. Mở `http://localhost:3000/api/auth/providers` xem có trả JSON không.
2. Nếu không trả JSON, kiểm tra lại env và callback URL.
3. Đảm bảo không có typo trong `.env.local`.
4. Restart server sau mọi thay đổi env.

## 7. Cấu hình cho production

Khi deploy, cập nhật callback theo domain thật:

- GitHub callback: `https://your-domain.com/api/auth/callback/github`
- Google redirect URI: `https://your-domain.com/api/auth/callback/google`

Và set env tương ứng trên platform deploy (Vercel, VPS, Docker, ...).
