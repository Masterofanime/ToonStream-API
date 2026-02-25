# 🚀 ToonStream API

[![Bun](https://img.shields.io/badge/Runtime-Bun-black?style=for-the-badge&logo=bun)](https://bun.sh)
[![Elysia](https://img.shields.io/badge/Framework-Elysia-lightgrey?style=for-the-badge&logo=elysia)](https://elysiajs.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Fast and lightweight Anime/Movie scraping API built with **Bun + Elysia**. High performance, developer-friendly, and ready for production use.

---

### ✨ Features

* **🔎 Search** – Real-time anime and movie searching with pagination support.
* **🎬 Listings** – Organized movie and series discovery.
* **📺 Streaming** – Fast retrieval of direct episode streaming sources and embed links.
* **⚡ Performance** – Powered by the **Bun** runtime for sub-millisecond internal overhead.
* **🧠 Smart Caching** – Integrated Redis support with configurable TTL to minimize target server load.
* **🌍 Deployment** – Optimized for Docker, Vercel, or any VPS running Bun.

---

### 📡 API Endpoints

#### 🏠 Home & Discovery
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Status/Health check |
| `GET` | `/home` | Fetch trending content and latest updates |

#### 🔎 Search
| Method | Endpoint | Example |
| :--- | :--- | :--- |
| `GET` | `/search/{query}/{page?}` | `/search/naruto/1` |

#### 🎬 Movies
| Method | Endpoint | Example |
| :--- | :--- | :--- |
| `GET` | `/movies/{page?}` | Get paginated movie list |
| `GET` | `/movie/info/{slug}` | `/movie/info/one-piece-film-red` |
| `GET` | `/movie/sources/{slug}` | Get video sources for a movie |

#### 📺 Series
| Method | Endpoint | Example |
| :--- | :--- | :--- |
| `GET` | `/series/{page?}` | Get paginated series list |
| `GET` | `/series/info/{slug}` | Get metadata & episode list |
| `GET` | `/episode/sources/{slug}` | `/episode/sources/naruto-shippuden-episode-1` |

---

### 🧠 How It Works (Request Flow)



1. **Request:** Client hits an endpoint (e.g., `/movie/info/slug`).
2. **Cache Check:** API checks Redis for a stored version of this slug.
3. **Scrape:** If not cached, **Cheerio** parses the target HTML.
4. **Transform:** Data is cleaned and mapped to a structured JSON object.
5. **Store & Serve:** Data is cached in Redis with a TTL and sent to the client.

---

### 🛠 Tech Stack

* **Runtime:** [Bun](https://bun.sh) (Ultra-fast JS runtime)
* **Framework:** [Elysia](https://elysiajs.com) (High-performance web framework)
* **Language:** TypeScript (Type-safe development)
* **Scraping:** Cheerio (Fast HTML parsing)
* **Caching:** Redis (Optional, recommended for production)

---

### ⚙️ Installation & Setup

**1. Clone the Repository**
```bash
git clone [https://gitlab.com/binrot/toonstream-api.git](https://gitlab.com/binrot/toonstream-api.git)
cd toonstream-api
```
**2. Install Dependencies**
```bash bun install```

**3. Setup Environment Variables**
```Create a .env file in the root directory:```
```bash
 PORT=3000
ENABLE_CACHE=true
REDIS_URL=redis://localhost:6379
# If using username/password:
# REDIS_URL=redis://user:password@host:port 
```
**4. Run Development Server**
```bash 
bun run dev
```
**5. Build for Production**
```bash
bun run start
```

**🧩 Project Structure**
```
src/
 ├── index.ts           # Entry point & Route definitions
 ├── lib/               # Shared utilities
 │    ├── cache.ts      # Redis logic & TTL management
 │    ├── const.ts      # Selectors, base URLs, and constants
 │    └── types.ts      # TypeScript interfaces/types
 └── scrapers/          # Scraper implementations
      ├── home.ts       # Trending & Homepage logic
      ├── movie.ts      # Movie specific parsing
      ├── search.ts     # Search functionality
      ├── series.ts     # Series & Episodes metadata
      └── embed/        # Logic for extracting video providers
```
**📦 Example Response**
```
{
  "success": true,
  "cached": true,
  "data": {
    "title": "One Piece Film: Red",
    "year": "2022",
    "genre": ["Action", "Adventure", "Fantasy"],
    "sources": [
      {
        "provider": "Vidsrc",
        "url": "[https://vidsrc.to/embed/movie/](https://vidsrc.to/embed/movie/)..."
      }
    ]
  }
}
```
⚠️ Error Handling
The API returns standard HTTP status codes:
 * 200 OK: Request successful.
 * 404 Not Found: Content not found on the target source.
 * 500 Internal Server Error: Scraper failure or target site structure change.
🔒 Graceful Shutdown
The API is built for stability and handles process signals to prevent data corruption or hanging connections:
 * ✅ SIGINT (Ctrl+C) - Closes server and Redis connection.
 * ✅ SIGTERM - Used by Docker/Cloud providers for clean exits.
 * ✅ Redis Safety - Ensures all pending cache writes are handled before closing.
📜 License
Distributed under the MIT License. See LICENSE for more information.
👤 Author
Made with ❤️ by Binrot
Disclaimer: This project is for educational purposes only. The author does not host any media files.