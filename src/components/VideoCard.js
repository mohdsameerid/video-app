import React from "react";

const formatViews = (count) => {
  if (!count) return "0";
  const n = parseInt(count);
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

const parseDuration = (iso) => {
  if (!iso) return "";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = parseInt(match[1] || 0);
  const m = parseInt(match[2] || 0);
  const s = parseInt(match[3] || 0);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

const avatarColors = [
  "bg-red-500", "bg-pink-500", "bg-purple-500", "bg-indigo-500",
  "bg-blue-500", "bg-teal-500", "bg-green-500", "bg-orange-500",
];
const getAvatarColor = (name = "") => {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return avatarColors[hash % avatarColors.length];
};

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info || {};
  const title = snippet?.title || "";
  const channel = snippet?.channelTitle || "";
  const thumbnail =
    snippet?.thumbnails?.maxres?.url ||
    snippet?.thumbnails?.high?.url ||
    snippet?.thumbnails?.medium?.url ||
    "";
  const views = formatViews(statistics?.viewCount);
  const published = timeAgo(snippet?.publishedAt);
  const duration = parseDuration(contentDetails?.duration);
  const initials = getInitials(channel);
  const avatarColor = getAvatarColor(channel);

  return (
    <div className="group flex flex-col cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>

      {/* Info row */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-bold`}
        >
          {initials}
        </div>

        {/* Text */}
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-[#f1f1f1] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-[#aaa] mt-1 hover:text-gray-700 dark:hover:text-[#f1f1f1] truncate">
            {channel}
          </p>
          <p className="text-xs text-gray-500 dark:text-[#aaa]">
            {views} views &bull; {published}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
