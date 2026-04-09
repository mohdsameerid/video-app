import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GOOGLE_YOUTUBE_API } from "../config";
import ShimmerUI from "./ShimmerUI";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const formatViews = (n) => {
  if (!n) return "0";
  const v = parseInt(n);
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (v >= 1_000_000)     return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000)         return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return v.toString();
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [[31536000,"year"],[2592000,"month"],[604800,"week"],[86400,"day"],[3600,"hour"],[60,"minute"]];
  for (const [s, l] of intervals) {
    const c = Math.floor(seconds / s);
    if (c >= 1) return `${c} ${l}${c > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

const parseDuration = (iso) => {
  if (!iso) return "";
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = parseInt(m[1] || 0), min = parseInt(m[2] || 0), s = parseInt(m[3] || 0);
  if (h > 0) return `${h}:${String(min).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  return `${min}:${String(s).padStart(2,"0")}`;
};

const avatarColors = ["bg-red-500","bg-pink-500","bg-purple-500","bg-indigo-500","bg-blue-500","bg-teal-500","bg-green-500","bg-orange-500"];
const getAvatarColor = (name = "") => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return avatarColors[h % avatarColors.length];
};
const getInitials = (name = "") => name.split(" ").slice(0,2).map(w => w[0]?.toUpperCase() || "").join("");

/* ─── accent colour map (full class names so Tailwind JIT keeps them) ─────── */
const ACCENTS = {
  red:    { from: "#dc2626", to: "#b91c1c", ring: "ring-red-500",    badge: "bg-red-600"    },
  purple: { from: "#9333ea", to: "#7e22ce", ring: "ring-purple-500", badge: "bg-purple-600" },
  green:  { from: "#16a34a", to: "#15803d", ring: "ring-green-500",  badge: "bg-green-600"  },
  blue:   { from: "#2563eb", to: "#1d4ed8", ring: "ring-blue-500",   badge: "bg-blue-600"   },
  orange: { from: "#ea580c", to: "#c2410c", ring: "ring-orange-500", badge: "bg-orange-600" },
};

/* ─── shimmer placeholders ────────────────────────────────────────────────── */
const CardShimmer = () => (
  <div className="flex flex-col animate-pulse">
    <div className="w-full aspect-video rounded-xl bg-gray-200 dark:bg-[#272727]" />
    <div className="flex gap-3 mt-3">
      <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[#272727] flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1 mt-1">
        <div className="h-3.5 bg-gray-200 dark:bg-[#272727] rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-1/3" />
      </div>
    </div>
  </div>
);

/* ─── hero (featured first video) ────────────────────────────────────────── */
const HeroCard = ({ video, accentFrom, isTrending }) => {
  const { snippet, statistics, contentDetails } = video;
  const thumb   = snippet?.thumbnails?.maxres?.url || snippet?.thumbnails?.high?.url || "";
  const title   = snippet?.title || "";
  const channel = snippet?.channelTitle || "";
  const views   = formatViews(statistics?.viewCount);
  const ago     = timeAgo(snippet?.publishedAt);
  const dur     = parseDuration(contentDetails?.duration);
  const color   = getAvatarColor(channel);
  const initials = getInitials(channel);

  return (
    <Link to={`/watch?v=${video.id}`} className="group block mb-8">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black"
           style={{ aspectRatio: "16/7" }}>
        <img src={thumb} alt={title}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90" />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* rank #1 badge */}
        {isTrending && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.53 11.2c-.23-.3-.5-.56-.77-.82-.81-.76-1.74-1.28-2.61-1.87-.96-.63-2.14-1.37-2.99-2.29-.17.61-.25 1.25-.2 1.9.06.9.37 1.74.8 2.5-.46-.24-.93-.52-1.35-.87-.87-.72-1.51-1.71-1.68-2.84-.06-.43-.08-.88 0-1.31-.87.7-1.56 1.64-1.97 2.65-.69 1.66-.72 3.56-.09 5.26.2.54.46 1.06.79 1.53.33.47.73.9 1.19 1.24.91.71 2.03 1.08 3.17 1.1 1.26.04 2.52-.34 3.51-1.1.97-.74 1.61-1.87 1.76-3.07.08-.6.03-1.22-.16-1.81-.1-.31-.24-.6-.4-.85z"/>
            </svg>
            #1 Trending
          </div>
        )}

        {/* duration */}
        {dur && (
          <span className="absolute bottom-[88px] right-4 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {dur}
          </span>
        )}

        {/* bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white text-xl sm:text-2xl font-bold leading-snug line-clamp-2 drop-shadow mb-2">
            {title}
          </p>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {initials}
            </div>
            <span className="text-white/80 text-sm font-medium">{channel}</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/60 text-xs">{views} views</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/60 text-xs">{ago}</span>
          </div>
        </div>

        {/* play button hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ─── regular video card with optional rank badge ─────────────────────────── */
const VideoItem = ({ video, rank, badgeClass }) => {
  const { snippet, statistics, contentDetails } = video;
  const thumb    = snippet?.thumbnails?.maxres?.url || snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || "";
  const title    = snippet?.title || "";
  const channel  = snippet?.channelTitle || "";
  const views    = formatViews(statistics?.viewCount);
  const ago      = timeAgo(snippet?.publishedAt);
  const dur      = parseDuration(contentDetails?.duration);
  const color    = getAvatarColor(channel);
  const initials = getInitials(channel);

  return (
    <Link to={`/watch?v=${video.id}`}
          className="group flex flex-col cursor-pointer hover:-translate-y-1 transition-transform duration-200">
      {/* thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-[#272727] shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <img src={thumb} alt={title}
             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
             loading="lazy" />

        {/* duration */}
        {dur && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {dur}
          </span>
        )}

        {/* rank badge */}
        {rank != null && (
          <span className={`absolute bottom-2 left-2 ${badgeClass} text-white text-xs font-bold px-2 py-0.5 rounded-full shadow`}>
            #{rank}
          </span>
        )}
      </div>

      {/* info */}
      <div className="flex gap-3 mt-3">
        <div className={`flex-shrink-0 w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold`}>
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-[#f1f1f1] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-[#aaa] mt-0.5 truncate">{channel}</p>
          <p className="text-xs text-gray-500 dark:text-[#aaa]">{views} views · {ago}</p>
        </div>
      </div>
    </Link>
  );
};

/* ─── main page ───────────────────────────────────────────────────────────── */
const CategoryPage = ({ title, categoryId, accent = "red", icon }) => {
  const [items, setItems]                 = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isFetching, setIsFetching]       = useState(false);
  const sentinelRef                       = useRef(null);
  const isTrending                        = title === "Trending";
  const colors                            = ACCENTS[accent] || ACCENTS.red;

  const fetchVideos = async (pageToken = "") => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res  = await fetch(GOOGLE_YOUTUBE_API(categoryId, pageToken));
      const json = await res.json();
      if (!json.error && json.items?.length) {
        setItems((prev) => pageToken ? [...prev, ...json.items] : json.items);
        setNextPageToken(json.nextPageToken || null);
      }
    } catch { /* silent */ }
    setIsFetching(false);
  };

  useEffect(() => {
    setItems([]);
    setNextPageToken(null);
    fetchVideos();
  }, [categoryId]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && nextPageToken && !isFetching) fetchVideos(nextPageToken); },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [nextPageToken, isFetching]);

  const heroVideo  = isTrending && items.length > 0 ? items[0] : null;
  const gridVideos = heroVideo ? items.slice(1) : items;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">

      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden px-6 py-8"
           style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}>
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute top-4 right-24 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 left-32 w-28 h-28 rounded-full bg-black/10" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg border border-white/20">
            {icon}
          </div>
          <div>
            <h1 className="text-white text-3xl font-extrabold tracking-tight drop-shadow">{title}</h1>
            <p className="text-white/70 text-sm mt-0.5">
              {isTrending ? "Top videos trending on YouTube today" :
               title === "Music" ? "Latest hits and music videos" :
               title === "Gaming" ? "Top gaming videos and highlights" :
               title === "News"   ? "Breaking news and updates" :
               title === "Sports" ? "Live scores, highlights & more" :
               `Top ${title} videos`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 max-w-screen-2xl mx-auto">
        {items.length === 0 && isFetching ? (
          <ShimmerUI />
        ) : (
          <>
            {/* Hero card */}
            {heroVideo && (
              <HeroCard video={heroVideo} accentFrom={colors.from} isTrending={isTrending} />
            )}

            {/* Section label */}
            {gridVideos.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-base font-bold text-gray-900 dark:text-[#f1f1f1]">
                  {isTrending ? "More Trending Videos" : `More in ${title}`}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-[#3f3f3f]" />
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {gridVideos.map((video, idx) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  rank={isTrending ? idx + 2 : null}
                  badgeClass={colors.badge}
                />
              ))}

              {/* bottom shimmer */}
              {isFetching && items.length > 0 &&
                Array(4).fill("").map((_, i) => <CardShimmer key={`s${i}`} />)
              }
            </div>
          </>
        )}

        {/* empty state */}
        {!isFetching && items.length === 0 && (
          <div className="flex flex-col items-center py-28 gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#272727] flex items-center justify-center text-3xl">{icon}</div>
            <p className="text-gray-400 dark:text-[#aaa] text-sm">No videos found.</p>
            <button
              onClick={() => fetchVideos()}
              className="px-5 py-2 rounded-full bg-gray-100 dark:bg-[#272727] text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#3f3f3f] dark:text-[#f1f1f1] transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div ref={sentinelRef} className="h-4" />
    </div>
  );
};

export default CategoryPage;
