import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeNavbar } from "../utils/navSlice";
import { YOUTUBE_VIDEO_DETAILS_API } from "../config";
import CommentContainer from "./CommentContainer";
import LiveChat from "./LiveChat";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const formatViews = (n) => {
  if (!n) return "0";
  const v = parseInt(n);
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (v >= 1_000_000)     return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000)         return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return v.toString();
};

const formatLikes = (n) => {
  if (!n) return "Like";
  const v = parseInt(n);
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000)     return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
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

const avatarColors = ["bg-red-500","bg-pink-500","bg-purple-500","bg-indigo-500","bg-blue-500","bg-teal-500","bg-green-500","bg-orange-500"];
const getAvatarColor = (name = "") => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return avatarColors[h % avatarColors.length];
};

/* ─── action button ───────────────────────────────────────────────────────── */
const ActionBtn = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-gray-900 dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f]"
        : "bg-gray-100 dark:bg-[#272727] text-gray-800 dark:text-[#f1f1f1] hover:bg-gray-200 dark:hover:bg-[#3f3f3f]"
    }`}
  >
    {icon}
    {label && <span>{label}</span>}
  </button>
);

/* ─── video info skeleton ─────────────────────────────────────────────────── */
const InfoSkeleton = () => (
  <div className="animate-pulse mt-4">
    <div className="h-5 bg-gray-200 dark:bg-[#272727] rounded w-3/4 mb-3" />
    <div className="h-4 bg-gray-200 dark:bg-[#272727] rounded w-1/3 mb-4" />
    <div className="flex gap-2">
      {Array(4).fill("").map((_, i) => (
        <div key={i} className="h-9 w-20 bg-gray-200 dark:bg-[#272727] rounded-full" />
      ))}
    </div>
  </div>
);

/* ─── main component ──────────────────────────────────────────────────────── */
const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [liked, setLiked]         = useState(false);
  const [saved, setSaved]         = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    dispatch(closeNavbar());
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!videoId) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setLoading(true);
    setVideoInfo(null);
    fetch(YOUTUBE_VIDEO_DETAILS_API(videoId))
      .then((r) => r.json())
      .then((json) => {
        if (json.items?.length) setVideoInfo(json.items[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [videoId]);

  const snippet    = videoInfo?.snippet    || {};
  const stats      = videoInfo?.statistics || {};
  const title      = snippet.title        || "";
  const channel    = snippet.channelTitle || "";
  const views      = formatViews(stats.viewCount);
  const likes      = formatLikes(stats.likeCount);
  const published  = timeAgo(snippet.publishedAt);
  const desc       = snippet.description  || "";
  const avatarColor = getAvatarColor(channel);
  const initial    = channel.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] px-3 sm:px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-screen-xl mx-auto">

        {/* ── Left column: player + info + comments ─────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Player */}
          <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-black">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video info */}
          {loading ? (
            <InfoSkeleton />
          ) : (
            <div className="mt-4">
              {/* Title */}
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#f1f1f1] leading-snug">
                {title || "Video"}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                {/* Channel */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-[#f1f1f1]">{channel}</p>
                    <p className="text-xs text-gray-500 dark:text-[#aaa]">{views} views · {published}</p>
                  </div>
                  <button className="ml-1 px-4 py-1.5 rounded-full bg-gray-900 dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-80 transition-opacity">
                    Subscribe
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  <ActionBtn
                    active={liked}
                    onClick={() => setLiked((p) => !p)}
                    label={liked ? `${likes} ✓` : likes}
                    icon={
                      <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                      </svg>
                    }
                  />
                  <ActionBtn
                    label="Share"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    }
                  />
                  <ActionBtn
                    active={saved}
                    onClick={() => setSaved((p) => !p)}
                    label={saved ? "Saved" : "Save"}
                    icon={
                      <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    }
                  />
                  <ActionBtn
                    label="Download"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Description */}
              {desc && (
                <div className="mt-4 bg-gray-100 dark:bg-[#272727] rounded-xl p-4">
                  <p className={`text-sm text-gray-700 dark:text-[#ccc] whitespace-pre-line leading-relaxed ${descExpanded ? "" : "line-clamp-3"}`}>
                    {desc}
                  </p>
                  {desc.length > 200 && (
                    <button
                      onClick={() => setDescExpanded((p) => !p)}
                      className="mt-2 text-sm font-semibold text-gray-900 dark:text-[#f1f1f1] hover:underline"
                    >
                      {descExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Comments */}
          <div className="mt-8">
            <CommentContainer viewCount={stats.commentCount} />
          </div>
        </div>

        {/* ── Right column: live chat ────────────────────────────────────── */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
