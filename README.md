
🚀 ToonStream API
Fast & lightweight Anime/Movie scraping API built with Bun + Elysia

✨ Features
🔎 Search anime & movies
🎬 Movie & series listing
📺 Episode streaming sources
⚡ Fast Bun runtime
🧠 Redis caching support
🛠 Clean REST API structure
🌍 Serverless ready (Vercel compatible)
📡 API Endpoints
🏠 Home
Copy code

GET /
GET /home
🔎 Search
Copy code

GET /search/{query}/{page?}
Example:
Copy code

/search/naruto/1
🎬 Movies
Copy code

GET /movies/{page?}
GET /movie/info/{slug}
GET /movie/sources/{slug}
Example:
Copy code

/movie/info/one-piece-film-red
📺 Series
Copy code

GET /series/{page?}
GET /series/info/{slug}
GET /episode/sources/{slug}
Example:
Copy code

/episode/sources/naruto-shippuden-episode-1
🛠 Tech Stack
Runtime: Bun
Framework: Elysia
Language: TypeScript
Scraping: Cheerio
Caching: Redis (optional)
⚙️ Installation
1️⃣ Clone Repository
Bash
Copy code
git clone https://gitlab.com/binrot/toonstream-api.git
cd toonstream-api
2️⃣ Install Dependencies
Bash
Copy code
bun install
3️⃣ Setup Environment
Create .env file:
Env
Copy code
PORT=3000
REDIS_URL=your_redis_url
4️⃣ Run Development Server
Bash
Copy code
bun run dev
Server runs at:
Copy code

http://localhost:3000
🚀 Deploy Now
🔵 Deploy to Vercel
��
🟣 Deploy to Railway
��
🟢 Deploy to Render
��
🟡 Deploy to Fly.io
Bash
Copy code
fly launch
🧩 Project Structure
Copy code

src/
 ├── index.ts
 ├── lib/
 │    ├── cache.ts
 │    ├── const.ts
 │    └── types.ts
 └── scrapers/
      ├── home.ts
      ├── movie.ts
      ├── search.ts
      ├── series.ts
      └── embed/
📦 Example Response
JSON
Copy code
{
  "success": true,
  "data": { ... }
}
🔒 Graceful Shutdown
Handles SIGINT
Handles SIGTERM
Proper Redis connection closing
📜 License
MIT License
👤 Author
Made with ❤️ by Binrot
If you want, I can also:
🔥 Make it more premium (like big open-source projects)
🧠 Add API documentation table format
🌐 Add live demo badge
🛡 Add rate limit info
🧾 Add Swagger docs section
🎨 Add dark themed README version
Tell me what level you want — normal, pro, or insane.
