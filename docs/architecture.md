# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                   http://localhost:3001                      │
│            (Stores basic auth & Server URL)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Server                            │
│                      (server.cjs)                            │
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │  Static Files   │  │         API Proxy                │  │
│  │    (dist/)      │  │  Checks: X-Everything-Server-Url │  │
│  │                 │  │  fallback: ENV.EVERYTHING_URL    │  │
│  │                 │  │                                  │  │
│  │                 │  │  Target: Dynamic IP / localhost  │  │
│  └─────────────────┘  └──────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                Everything HTTP Server                        │
│             (Remote IP: 192.168.x.x OR Local)                │
│              (File indexing & search engine)                 │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### Search Request

```
1. Browser: GET /api/?search=pdf&j=1
2. Express: Remove /api prefix → GET /?search=pdf&j=1
3. Everything: Return JSON results
4. Express: Strip WWW-Authenticate, forward response
5. Browser: Display results
```

### File Preview

```
1. Browser: GET /api/D%3A%5Cpath%5Cfile.pdf
2. Express: Proxy to Everything with auth headers
3. Everything: Stream file content
4. Browser: Display in iframe/img/video
```

## Key Components

| Component    | File                   | Purpose               |
| ------------ | ---------------------- | --------------------- |
| React App    | `src/`                 | Frontend UI           |
| Build Output | `dist/`                | Production bundle     |
| Proxy Server | `server.cjs`           | Static + API proxy    |
| PM2 Config   | `ecosystem.config.cjs` | Process management    |
| Env Config   | `.env.production`      | Environment variables |

## Security Considerations

1. **Credentials**: Stored in browser localStorage, sent via Authorization header
2. **Proxy**: All API requests go through server, hiding backend from browser
3. **CORS**: Eliminated by same-origin proxy architecture
4. **Auth Header**: `WWW-Authenticate` stripped to prevent native popup
