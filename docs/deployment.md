# Production Deployment Guide

## Prerequisites

- Node.js >= 18
- PM2 (`npm install -g pm2`)
- Everything HTTP Server running on port 80

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build production bundle
npm run build

# 3. Start with PM2
pm2 start ecosystem.config.cjs

# 4. Access application
open http://localhost:3001
```

## Configuration Files

### `.env.production`

```properties
VITE_EVERYTHING_URL="http://localhost:80"
VITE_APP_API_URL="/api"
```

### `ecosystem.config.cjs`

```javascript
module.exports = {
  apps: [
    {
      name: "everything-search-app",
      script: "server.cjs",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        VITE_EVERYTHING_URL: "http://localhost:80",
      },
    },
  ],
};
```

## Architecture

```
Browser (:3001) → Express Server → /api/* → Everything HTTP (:80)
                                 → Static  → dist/
```

## PM2 Commands

| Command                             | Description        |
| ----------------------------------- | ------------------ |
| `pm2 list`                          | View all processes |
| `pm2 logs everything-search-app`    | View logs          |
| `pm2 restart everything-search-app` | Restart app        |
| `pm2 stop everything-search-app`    | Stop app           |
| `pm2 delete everything-search-app`  | Remove from PM2    |

## Changing Port

Edit `ecosystem.config.cjs`:

```javascript
env: {
  PORT: 3002, // New port
}
```

Then restart:

```bash
pm2 restart everything-search-app --update-env
```

## Connecting to Remote Everything Server

Nếu Everything HTTP Server chạy trên máy khác (ví dụ: `192.168.1.191`), thay đổi cấu hình như sau:

### 1. Sửa `ecosystem.config.cjs`

```javascript
module.exports = {
  apps: [
    {
      name: "everything-search-app",
      script: "server.cjs",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        VITE_EVERYTHING_URL: "http://192.168.1.191:80", // ← Remote IP
      },
    },
  ],
};
```

### 2. Apply Changes

```bash
pm2 restart everything-search-app --update-env
```

### Prerequisites trên máy chủ Everything

1. **Enable HTTP Server**: Everything → Options → HTTP Server → Enable HTTP Server
2. **Firewall**: Mở port 80 (hoặc port đã cấu hình)
3. **Network**: Đảm bảo 2 máy có thể ping được nhau

### Troubleshooting Remote Connection

| Symptom            | Cause              | Fix                    |
| ------------------ | ------------------ | ---------------------- |
| Connection refused | Firewall           | Mở port trên máy chủ   |
| Timeout            | Wrong IP           | Kiểm tra IP, thử ping  |
| CORS error         | Wrong proxy config | Luôn dùng `/api` proxy |
