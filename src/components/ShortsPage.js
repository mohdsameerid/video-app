import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_SHORTS_API } from "../config";

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

/* ── Action button (like, comment, share …) ── */
const ActionBtn = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-1 text-white">
    <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
      {icon}
    </div>
    <span className="text-[11px] font-medium">{label}</span>
  </button>
);

/* ── Single short slide ── */
const ShortSlide = ({ item }) => {
  const { id, snippet } = item;
  const videoId = id?.videoId;
  const title   = snippet?.title || "";
  const channel = snippet?.channelTitle || "";
  const published = timeAgo(snippet?.publishedAt);
  const [playing, setPlaying] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const portraitThumb = videoId ? `https://i.ytimg.com/vi/${videoId}/oar2.jpg` : "";
  const fallbackThumb =
    snippet?.thumbnails?.high?.url ||
    snippet?.thumbnails?.medium?.url ||
    snippet?.thumbnails?.default?.url ||
    "";

  return (
    <div
      ref={slideRef}
      className="relative flex items-center justify-center bg-black flex-shrink-0"
      style={{ height: "calc(100vh - 56px)", scrollSnapAlign: "start" }}
    >
      {/* Portrait card */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative h-full max-w-[420px] w-full">

          {/* Video player or Thumbnail */}
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          ) : (
            <img
              src={portraitThumb}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = fallbackThumb; }}
            />
          )}

          {/* Dark gradient overlays — hidden when video is playing */}
          {!playing && <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />}
          {!playing && <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-14 p-4 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold border border-white/30">
                {channel.charAt(0).toUpperCase()}
              </div>
              <span className="text-white text-sm font-semibold">{channel}</span>
              <button className="ml-1 text-white text-xs border border-white/60 rounded-full px-2.5 py-0.5 hover:bg-white/10 transition-colors">
                Follow
              </button>
            </div>
            <p className="text-white text-sm leading-snug line-clamp-2">{title}</p>
            <p className="text-white/60 text-xs mt-1">{published}</p>
          </div>

          {/* Right action buttons */}
          <div className="absolute bottom-16 right-3 flex flex-col gap-5">
            <ActionBtn
              label="Like"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </svg>
              }
            />
            <ActionBtn
              label="Comment"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              }
            />
            <ActionBtn
              label="Share"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              }
            />
            <ActionBtn
              label="Watch"
              icon={
                <Link to={`/watch?v=${videoId}`} onClick={(e) => e.stopPropagation()}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </Link>
              }
            />
          </div>

          {/* Shorts logo */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-1.03-2.5-3.35-4.32-6.1-4.32A7 7 0 1012 19a7 7 0 006.7-4.97l-1.56-.54A5.5 5.5 0 1112 6.5c2.08 0 3.85 1.15 4.79 2.85L15 10l4.99 1-.22-5-1 1.32z" />
            </svg>
            <span className="text-white text-sm font-bold">Shorts</span>
          </div>
        </div>

        {/* Wider desktop: nav arrows */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 max-w-[420px] w-full pointer-events-none">
          {/* These are decoration placeholders — scroll snap handles navigation */}
        </div>
      </div>
    </div>
  );
};

/* ── Loading shimmer slide ── */
const ShimmerSlide = () => (
  <div
    className="flex items-center justify-center bg-black flex-shrink-0"
    style={{ height: "calc(100vh - 56px)", scrollSnapAlign: "start" }}
  >
    <div className="relative h-full max-w-[420px] w-full animate-pulse">
      <div className="w-full h-full bg-[#1a1a1a]" />
      <div className="absolute bottom-6 left-4 right-14 flex flex-col gap-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  </div>
);

/* ── Main Shorts page ── */
const ShortsPage = () => {
  const [items, setItems] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);

  const fetchShorts = async (pageToken = "") => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res  = await fetch(YOUTUBE_SHORTS_API(pageToken));
      const json = await res.json();
      if (!json.error && json.items?.length) {
        setItems((prev) => pageToken ? [...prev, ...json.items] : json.items);
        setNextPageToken(json.nextPageToken || null);
      }
    } catch {
      // silent
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  // Load more when user approaches the last 3 videos
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || isFetching || !nextPageToken) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (remaining < el.clientHeight * 3) {
      fetchShorts(nextPageToken);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="bg-black"
      style={{
        height: "calc(100vh - 56px)",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`.shorts-container::-webkit-scrollbar { display: none; }`}</style>

      {items.length === 0 && isFetching
        ? Array(3).fill("").map((_, i) => <ShimmerSlide key={i} />)
        : items.map((item) => <ShortSlide key={item.id?.videoId} item={item} />)
      }

      {/* Bottom loader when fetching more */}
      {isFetching && items.length > 0 && <ShimmerSlide />}

      {/* Error / empty state */}
      {!isFetching && items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-white/50 text-sm">No shorts found.</p>
          <button
            onClick={() => fetchShorts()}
            className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortsPage;
