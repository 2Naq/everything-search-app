# Troubleshooting Guide

## Bug #1: Native Browser Login Popup

### Symptom

Khi chưa đăng nhập, trình duyệt hiển thị popup đăng nhập của hệ thống thay vì custom Login Dialog.

### Root Cause

Everything HTTP Server trả về header `WWW-Authenticate: Basic` cùng với lỗi 401. Trình duyệt tự động hiển thị popup đăng nhập khi thấy header này.

### Solution

Strip header `WWW-Authenticate` trong proxy response:

```javascript
// server.cjs
onProxyRes: (proxyRes) => {
  if (proxyRes.headers["www-authenticate"]) {
    delete proxyRes.headers["www-authenticate"];
  }
};
```

---

## Bug #2: CORS Error - File Preview Fails

### Symptom

```
Access to fetch at 'http://localhost/' blocked by CORS policy
```

File preview dialog hiển thị "Unable to load preview".

### Root Cause

`FilePreview.tsx` fetch file trực tiếp từ `VITE_EVERYTHING_URL` (port 80) thay vì qua proxy. Browser chặn cross-origin request.

### Solution

Route requests qua `/api` proxy:

```tsx
// Before (broken)
const urlForFetch = `${VITE_EVERYTHING_URL}/${encodedPath}`;

// After (fixed)
const urlForFetch = `/api/${encodedPath}`;
```

---

## Bug #3: Express 5 Path Error

### Symptom

```
PathError [TypeError]: Missing parameter name at index
```

Server crash khi khởi động.

### Root Cause

Express 5 sử dụng `path-to-regexp` v8 không hỗ trợ wildcard `"*"`.

### Solution

Dùng regex pattern thay cho wildcard:

```javascript
// Before (broken)
app.get("*", (req, res) => { ... });

// After (fixed)
app.get(/^(?!\/api).*/, (req, res) => { ... });
```

---

## Bug #4: PM2 Serve - No Proxy Support

### Symptom

Search trả về lỗi "Connection Error" hoặc JSON parse error.

### Root Cause

`pm2 serve` chỉ serve static files, không có proxy capability. Requests đến `/api` trả về `index.html`.

### Solution

Sử dụng custom Express server (`server.cjs`) thay vì `pm2 serve`.

---

## Quick Diagnosis

| Symptom             | Likely Cause            | Fix                    |
| ------------------- | ----------------------- | ---------------------- |
| Native login popup  | WWW-Authenticate header | Check proxy onProxyRes |
| CORS error          | Direct URL fetch        | Use /api proxy path    |
| Path error on start | Express 5 wildcard      | Use regex pattern      |
| JSON parse error    | pm2 serve no proxy      | Use server.cjs         |
