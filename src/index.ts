import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { Cache, redis } from "./lib/cache";
import { ScrapeHomePage } from "./scrapers/home";
import { ScrapeMovieInfo, ScrapeMovies, ScrapeMovieSources } from "./scrapers/movie";
import { ScrapeSearch } from "./scrapers/search";
import { ScrapeEpisodeSources, ScrapeSeries, ScrapeSeriesInfo } from "./scrapers/series";

const HOME_CACHE_TTL = 43_200 // 12hr
const SEARCH_CACHE_TTL = 43_200 // 12hr

const MOVIES_PAGE_CACHE_TTL = 3600 * 24 * 30 // 30 days
const SERIES_PAGE_CACHE_TTL = 3600 * 24 * 30  // 30 days

const MOVIE_INFO_CACHE_TTL = 3600 * 24 * 14 // 14 days
const SERIES_INFO_CACHE_TTL = 3600 * 24 * 3 // 3 days

const app = new Elysia()
  .use(cors())
  .get("/", () => {
    return {
      name: "toonstream-api",
      version: "0.1",
      endpoints: [
        "/home",
        "/search/{query}/{page}",
        "----------------------",
        "/movies/{page}",
        "/movie/info/{slug}",
        "/movie/sources/{url}",
        "----------------------",
        "/series/{page}",
        "/series/info/{slug}",
        "/episode/sources/{slug}",
      ],
    };
  })
  .get("/home", async () => {
    const then = performance.now();
    // serve cache if has
    const cachedHomeData = await Cache.get("home", true);
    if (cachedHomeData)
      return {
        success: true,
        served_cache: true,
        took_ms: (performance.now() - then).toFixed(2),
        data: cachedHomeData
      };

    const data = await ScrapeHomePage();

    if (data?.lastEpisodes || data?.main || data?.sidebar) {
      Cache.set("home", true, data, HOME_CACHE_TTL); // dont await
    }

    if (data)
      return {
        success: true,
        took_ms: (performance.now() - then).toFixed(2),
        data: data,
        served_cache: false,
      };
    else
      return {
        success: false,
        took_ms: (performance.now() - then).toFixed(2),
        msg: "No Data Scraped!",
      };
  })

  .get("/search/:query/:page?",
    async ({ params: { query, page } }) => {
      const then = performance.now();

      const key = `search:${query}:${page || 1}`;
      const cachedSearchData = await Cache.get(key, true);
      if (cachedSearchData)
        return {
          success: true,
          served_cache: true,
          took_ms: (performance.now() - then).toFixed(2),
          data: cachedSearchData
        };

      const data = await ScrapeSearch(query, page);

      if (data?.data) {
        Cache.set(key, true, data, SEARCH_CACHE_TTL); // dont await
      }

      if (data)
        return {
          success: true,
          served_cache: false,
          took_ms: (performance.now() - then).toFixed(2),
          data: data,
        };
      else
        return {
          success: false,
          took_ms: (performance.now() - then).toFixed(2),
          msg: "No Data Scraped!",
        };
    },
    {
      params: t.Object({
        query: t.String(),
        page: t.Optional(t.Number()),
      }),
    }
  )

  .get("/movies/:page?",
    async ({ params: { page } }) => {
      const then = performance.now();
      const key = `movies:${page || 1}`;
      const cachedMoviesData = await Cache.get(key, true);


      if (cachedMoviesData)
        return {
          success: true,
          served_cache: true,
          page: page || 1,
          took_ms: (performance.now() - then).toFixed(2),
          data: cachedMoviesData
        };

      const data = await ScrapeMovies(page);

      if (data?.data) {
        Cache.set(key, true, data, MOVIES_PAGE_CACHE_TTL); // dont await
      }

      if (data) {
        return {
          success: true,
          served_cache: false,
          took_ms: (performance.now() - then).toFixed(2),
          page: page || 1,
          data: data,
        };
      }
      else
        return {
          success: false,
          took_ms: (performance.now() - then).toFixed(2),
          page: page || 1,
          msg: "No Data Scraped!",
        };
    },
    {
      params: t.Object({
        page: t.Optional(t.Number()),
      }),
    }
  )
  .get("/movie/info/:slug", async ({ params: { slug } }) => {

    const then = performance.now();
    const key = `movie:info:${slug}`;
    const cachedMovieData = await Cache.get(key, true);

    if (cachedMovieData)
      return {
        success: true,
        served_cache: true,
        took_ms: (performance.now() - then).toFixed(2),
        data: cachedMovieData
      };

    const data = await ScrapeMovieInfo(slug);

    if (data) {
      Cache.set(key, true, data, MOVIE_INFO_CACHE_TTL); // dont await

      return {
        success: true,
        served_cache: false,
        took_ms: (performance.now() - then).toFixed(2),
        data: data,
      };
    }

    else
      return {
        success: false,
        took_ms: (performance.now() - then).toFixed(2),
        msg: "No Data Scraped!",
      };
  })
  .get("/movie/sources/:slug/", async ({ params: { slug } }) => {
    const then = performance.now();

    const data = await ScrapeMovieSources(slug);

    if (data)
      return {
        success: true,
        took_ms: (performance.now() - then).toFixed(2),
        data: data,
      };
    else
      return {
        success: false,
        took_ms: (performance.now() - then).toFixed(2),
        msg: "No Data Scraped!",
      };
  })

  .get("/series/:page?",
    async ({ params: { page } }) => {
      const then = performance.now();
      const key = `series:${page}`;

      const cachedData = await Cache.get(key, true);

      if (cachedData)
        return {
          success: true,
          served_cache: true,
          page: page || 1,
          took_ms: (performance.now() - then).toFixed(2),
          data: cachedData
        };

      const data = await ScrapeSeries(page);

      if (data?.data) {
        Cache.set(key, true, data, SERIES_PAGE_CACHE_TTL); // dont await
      }

      if (data) {
        return {
          success: true,
          served_cache: false,
          took_ms: (performance.now() - then).toFixed(2),
          page: page || 1,
          data: data,
        };
      }
      else
        return {
          success: false,
          took_ms: (performance.now() - then).toFixed(2),
          page: page || 1,
          msg: "No Data Scraped!",
        };
    },
    {
      params: t.Object({
        page: t.Optional(t.Number()),
      }),
    }
  )
  .get("/series/info/:slug", async ({ params: { slug } }) => {
    const then = performance.now();
    const key = `series:info:${slug}`;

    const cachedData = await Cache.get(key, true);

    if (cachedData)
      return {
        success: true,
        served_cache: true,
        took_ms: (performance.now() - then).toFixed(2),
        data: cachedData
      };

    const data = await ScrapeSeriesInfo(slug);

    if (data) {
      Cache.set(key, true, data, SERIES_INFO_CACHE_TTL); // dont await

      return {
        success: true,
        served_cache: false,
        took_ms: (performance.now() - then).toFixed(2),
        data: data,
      };
    }
    else
      return {
        success: false,
        took_ms: (performance.now() - then).toFixed(2),
        msg: "No Data Scraped!",
      };
  })
  .get("/episode/sources/:slug", async ({ params: { slug } }) => {
    const data = await ScrapeEpisodeSources(slug);
    if (data)
      return {
        success: true,
        data: data,
      };
    else
      return {
        success: false,
        msg: "No Data Scraped!",
      };
  });


const port = Bun.env.PORT || 3000;
app.listen(port);

console.log(
  `Elysia is running at ${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`
);


function gracefulShutdown(signal: string) {
  console.log(`${signal} received. Closing Redis connection...`);
  redis.close();
  console.log("Redis connection closed. Exiting.");
  process.exit(0);
}

// Handle Ctrl+C (Manual stop)
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle Docker stop / PM2 restart / systemctl stop
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

export default app