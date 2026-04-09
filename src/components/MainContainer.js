import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GOOGLE_YOUTUBE_API } from "../config";
import VideoCard from "./VideoCard";

/* ─── section config ──────────────────────────────────────────────────────── */
const SECTIONS = [
  { key: "popular", label: "Popular Now",   emoji: "🔥", categoryId: "",   to: "/trending" },
  { key: "music",   label: "Music",         emoji: "🎵", categoryId: "10", to: "/music"    },
  { key: "gaming",  label: "Gaming",        emoji: "🎮", categoryId: "20", to: "/gaming"   },
  { key: "news",    label: "Breaking News", emoji: "📰", categoryId: "25", to: "/news"     },
  { key: "sports",  label: "Sports",        emoji: "⚽", categoryId: "17", to: "/sports"   },
];

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const formatViews = (n) => {
  if (!n) return "";
  const v = parseInt(n);
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B views";
  if (v >= 1_000_000)     return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M views";
  if (v >= 1_000)         return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K views";
  return v + " views";
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const s = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [[31536000,"year"],[2592000,"month"],[604800,"week"],[86400,"day"],[3600,"hour"],[60,"minute"]];
  for (const [sec, lbl] of intervals) {
    const c = Math.floor(s / sec);
    if (c >= 1) return `${c} ${lbl}${c > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

/* ─── hero section ────────────────────────────────────────────────────────── */
const HeroShimmer = () => (
  <div className="w-full animate-pulse bg-gray-200 dark:bg-[#1e1e2e]" style={{ height: "480px" }} />
);

const Hero = ({ video }) => {
  const thumb   = video?.snippet?.thumbnails?.maxres?.url || video?.snippet?.thumbnails?.high?.url || "";
  const title   = video?.snippet?.title || "";
  const channel = video?.snippet?.channelTitle || "";
  const views   = formatViews(video?.statistics?.viewCount);
  const ago     = timeAgo(video?.snippet?.publishedAt);

  return (
    <Link
      to={`/watch?v=${video?.id}`}
      className="relative w-full flex overflow-hidden group"
      style={{ height: "clamp(260px, 42vw, 500px)" }}
    >
      {/* Background thumbnail */}
      <img
        src={thumb}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end p-6 sm:p-10 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Featured
        </span>
        <h2 className="text-white text-2xl sm:text-4xl font-extrabold leading-tight line-clamp-3 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-white/60 text-sm mt-2">{channel} &nbsp;·&nbsp; {views} &nbsp;·&nbsp; {ago}</p>

        <div className="flex items-center gap-3 mt-5">
          <div className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors">
            + Add to List
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ─── row shimmer ─────────────────────────────────────────────────────────── */
const RowShimmer = () => (
  <>
    {Array(6).fill("").map((_, i) => (
      <div key={i} className="flex-shrink-0 w-64 sm:w-72 animate-pulse">
        <div className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-[#1e1e2e]" />
        <div className="mt-2.5 space-y-2 px-0.5">
          <div className="h-3 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-4/5" />
          <div className="h-3 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-2/5" />
        </div>
      </div>
    ))}
  </>
);

/* ─── horizontal video row ────────────────────────────────────────────────── */
const VideoRow = ({ section, items, loading }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 700, behavior: "smooth" });
  };

  return (
    <div className="mb-10">
      {/* Row header */}
      <div className="flex items-center justify-between px-5 sm:px-8 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{section.emoji}</span>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#f1f1f1] tracking-tight">
            {section.label}
          </h2>
        </div>
        <Link
          to={section.to}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors group"
        >
          See all
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Scrollable row + nav arrows */}
      <div className="relative group/row">
        {/* Left fade + arrow */}
        <div className="absolute left-0 top-0 bottom-6 z-10 w-16 bg-gradient-to-r from-white dark:from-[#0d0d14] to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity pointer-events-none">
          <button
            onClick={() => scroll(-1)}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white dark:bg-[#1e1e2e] shadow-lg border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-[#f1f1f1] hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex gap-4 px-5 sm:px-8 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? <RowShimmer /> : items.map((video) => (
            <Link
              key={video.id}
              to={`/watch?v=${video.id}`}
              className="flex-shrink-0 w-64 sm:w-72"
            >
              <VideoCard info={video} />
            </Link>
          ))}
        </div>

        {/* Right fade + arrow */}
        <div className="absolute right-0 top-0 bottom-6 z-10 w-16 bg-gradient-to-l from-white dark:from-[#0d0d14] to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity pointer-events-none">
          <button
            onClick={() => scroll(1)}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white dark:bg-[#1e1e2e] shadow-lg border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-[#f1f1f1] hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── main container ──────────────────────────────────────────────────────── */
const MainContainer = () => {
  const [data,    setData]    = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      SECTIONS.map((s) =>
        fetch(GOOGLE_YOUTUBE_API(s.categoryId))
          .then((r) => r.json())
          .then((json) => [s.key, json.items || []])
          .catch(() => [s.key, []])
      )
    ).then((results) => {
      setData(Object.fromEntries(results));
      setLoading(false);
    });
  }, []);

  const hero        = data.popular?.[0] || null;
  const popularRest = data.popular?.slice(1) || [];

  return (
    <div className="pb-10">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {loading ? <HeroShimmer /> : hero && <Hero video={hero} />}

      {/* ── Rows ─────────────────────────────────────────────────────────── */}
      <div className="mt-8">
        {SECTIONS.map((s) => (
          <VideoRow
            key={s.key}
            section={s}
            items={s.key === "popular" ? popularRest : (data[s.key] || [])}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
