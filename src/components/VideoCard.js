import React from "react";

const formatViews = (count) => {
  if (!count) return "0";
  const n = parseInt(count);
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)         return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [
    [31536000, "year"], [2592000, "month"], [604800, "week"],
    [86400, "day"],     [3600, "hour"],     [60, "minute"],
  ];
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
  if (h > 0) return `${h}:${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${min}:${String(s).padStart(2, "0")}`;
};

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info || {};
  const title     = snippet?.title || "";
  const channel   = snippet?.channelTitle || "";
  const thumbnail = snippet?.thumbnails?.maxres?.url || snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || "";
  const views     = formatViews(statistics?.viewCount);
  const published = timeAgo(snippet?.publishedAt);
  const duration  = parseDuration(contentDetails?.duration);

  return (
    <div className="group flex flex-col cursor-pointer">

      {/* ── Thumbnail ─────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#1e1e2e] ring-2 ring-transparent group-hover:ring-violet-500 transition-all duration-300 shadow-sm group-hover:shadow-violet-200 dark:group-hover:shadow-violet-900/40 group-hover:shadow-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-violet-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
            {duration}
          </span>
        )}
      </div>

      {/* ── Info ──────────────────────────────────────────────────────────── */}
      <div className="mt-3 px-0.5">
        {/* Title */}
        <p className="text-[13.5px] font-semibold text-gray-900 dark:text-[#f1f1f1] leading-snug line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
          {title}
        </p>

        {/* Channel + meta */}
        <div className="flex items-center justify-between mt-1.5 gap-2">
          <p className="text-[12px] text-gray-500 dark:text-[#aaa] truncate hover:text-violet-500 dark:hover:text-violet-400 transition-colors">
            {channel}
          </p>
          <span className="flex-shrink-0 text-[11px] font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full">
            {views} views
          </span>
        </div>

        <p className="text-[11px] text-gray-400 dark:text-[#666] mt-0.5">{published}</p>
      </div>
    </div>
  );
};

export default VideoCard;
