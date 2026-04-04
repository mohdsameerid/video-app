import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_YOUTUBE_API } from "../config";
import { setVideos, appendVideos, setFetching } from "../utils/videosSlice";
import VideoCard from "./VideoCard";
import ShimmerUI from "./ShimmerUI";

// YouTube category IDs — null means no filter (use mostPopular)
const CATEGORY_MAP = {
  "All":        "",
  "Music":      "10",
  "Gaming":     "20",
  "News":       "25",
  "Sports":     "17",
  "Technology": "28",
  "Comedy":     "23",
  "Film":       "1",
  "Cooking":    "26",
  "Fashion":    "26",
  "Autos":      "2",
  "Mixes":      "",
  "Podcasts":   "",
  "Live":       "",
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

const BottomShimmer = () => (
  <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8">
    {Array(4).fill("").map((_, i) => (
      <div key={i} className="flex flex-col animate-pulse">
        <div className="w-full aspect-video rounded-xl bg-gray-200" />
        <div className="flex gap-3 mt-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-2 flex-1 mt-0.5">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MainContainer = () => {
  const dispatch = useDispatch();
  const byCategory = useSelector((store) => store.videos.byCategory);
  const isFetching = useSelector((store) => store.videos.isFetching);

  const [activeCategory, setActiveCategory] = useState("All");
  const sentinelRef = useRef(null);

  const currentData     = byCategory[activeCategory]?.items || [];
  const nextPageToken   = byCategory[activeCategory]?.nextPageToken || null;
  const isInitialLoad   = currentData.length === 0 && isFetching;

  // Fetch when category changes — skip if already cached
  useEffect(() => {
    if (!byCategory[activeCategory]) {
      fetchVideos(activeCategory);
    }
  }, [activeCategory]);

  const fetchVideos = async (category, pageToken = "") => {
    dispatch(setFetching(true));
    try {
      const res  = await fetch(GOOGLE_YOUTUBE_API(CATEGORY_MAP[category], pageToken));
      const json = await res.json();

      // API returned an error — don't cache so user can retry
      if (json.error || !json.items) {
        dispatch(setFetching(false));
        return;
      }

      if (pageToken) {
        dispatch(appendVideos({ category, items: json.items, nextPageToken: json.nextPageToken }));
      } else {
        dispatch(setVideos({ category, items: json.items, nextPageToken: json.nextPageToken }));
      }
    } catch {
      // network error — don't cache
    }
    dispatch(setFetching(false));
  };

  // Infinite scroll sentinel
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !isFetching) {
          fetchVideos(activeCategory, nextPageToken);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [activeCategory, nextPageToken, isFetching]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  const chipClass = (cat) =>
    `flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      activeCategory === cat
        ? "bg-gray-900 dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f]"
        : "bg-gray-100 dark:bg-[#272727] text-gray-800 dark:text-[#f1f1f1] hover:bg-gray-200 dark:hover:bg-[#3f3f3f]"
    }`;

  return (
    <div>
      {/* Category chips */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-[#3f3f3f]">
        <div className="flex gap-3 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)} className={chipClass(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Initial load shimmer */}
      {isInitialLoad ? (
        <ShimmerUI />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-3 py-4 sm:px-4 sm:py-6">
          {currentData.length > 0 ? (
            currentData.map((video) => (
              <Link key={video.id} to={"/watch?v=" + video.id}>
                <VideoCard info={video} />
              </Link>
            ))
          ) : (
            !isFetching && (
              <div className="col-span-full flex flex-col items-center py-20 gap-3">
                <p className="text-gray-400 dark:text-gray-500 text-sm">No videos found for this category.</p>
                <button
                  onClick={() => fetchVideos(activeCategory)}
                  className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-[#272727] dark:text-[#f1f1f1] text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#3f3f3f]"
                >
                  Retry
                </button>
              </div>
            )
          )}

          {/* Next page shimmer */}
          {isFetching && currentData.length > 0 && <BottomShimmer />}
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />
    </div>
  );
};

export default MainContainer;
