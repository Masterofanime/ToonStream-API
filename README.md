# 🚀 ToonStream API

[![Bun](https://img.shields.io/badge/Runtime-Bun-black?style=for-the-badge&logo=bun)](https://bun.sh)
[![Elysia](https://img.shields.io/badge/Framework-Elysia-lightgrey?style=for-the-badge&logo=elysia)](https://elysiajs.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Fast and lightweight Anime/Movie scraping API built with **Bun + Elysia**. High performance, developer-friendly, and ready for production.

---

### ✨ Features

* **🔎 Search** – Real-time anime and movie searching.
* **🎬 Listings** – Organized movie and series listing.
* **📺 Streaming** – Fast retrieval of episode streaming sources.
* **⚡ Performance** – Powered by the Bun runtime for sub-millisecond overhead.
* **🧠 Caching** – Optional Redis support for lightning-fast responses.
* **🌍 Deployment** – Serverless ready (fully compatible with Vercel).

---

### 📡 API Endpoints

#### 🏠 Home
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Status/Health check |
| `GET` | `/home` | Fetch homepage content |

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
| `GET` | `/series/info/{slug}` | Get metadata for a series |
| `GET` | `/episode/sources/{slug}` | `/episode/sources/naruto-shippuden-episode-1` |

---

### 🛠 Tech Stack

* **Runtime:** Bun
* **Framework:** Elysia
* **Language:** TypeScript
* **Scraping:** Cheerio
* **Caching:** Redis (optional)

---

### ⚙️ Installation

**1. Clone the Repository**
```bash
git clone [https://gitlab.com/binrot/toonstream-api.git](https://gitlab.com/binrot/toonstream-api.git)
cd toonstream-api
```
2. Install Dependencies
bun install

3. Setup Environment
Create a .env file in the root directory:
```
PORT=3000
REDIS_URL=your_redis_url
```
4. Run Development Server
```
bun run dev
```

🧩 Project Structure
```
src/
 ├── index.ts           # Entry point
 ├── lib/               # Shared utilities
 │    ├── cache.ts      # Redis logic
 │    ├── const.ts      # Constants
 │    └── types.ts      # TypeScript interfaces
 └── scrapers/          # Scraper implementations
      ├── home.ts
      ├── movie.ts
      ├── search.ts
      ├── series.ts
      └── embed/        # Video provider scrapers
```
📦 Example Response
```
{
  "success": true,
  "data": {
    "title": "One Piece Film: Red",
    "year": "2022",
    "sources": [...]
  }
}
```
🔒 Graceful Shutdown
​The API is built for stability and handles exit signals properly:
​✅ Handles SIGINT
​✅ Handles SIGTERM
​✅ Proper Redis connection closing
​📜 License
​Distributed under the MIT License.
​👤 Author
​Made with ❤️ by Binrot
