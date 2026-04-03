import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_YOUTUBE_API } from "../config";
import { setVideos, appendVideos, setFetching } from "../utils/videosSlice";
import VideoCard from "./VideoCard";
import ShimmerUI from "./ShimmerUI";

const CATEGORIES = [
  "All", "Mixes", "Podcasts", "Live", "Music", "Gaming",
  "News", "Cooking", "Sports", "Technology", "Fashion", "Travel", "Comedy", "Learning",
];

// Shimmer cards shown while loading next page
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
  const data = useSelector((store) => store.videos.items);
  const nextPageToken = useSelector((store) => store.videos.nextPageToken);
  const isFetching = useSelector((store) => store.videos.isFetching);

  const [activeCategory, setActiveCategory] = useState("All");
  const sentinelRef = useRef(null);

  // Initial fetch — only if nothing cached
  useEffect(() => {
    if (data.length === 0) {
      fetchVideos();
    }
  }, []);

  const fetchVideos = async (pageToken = "") => {
    dispatch(setFetching(true));
    const res = await fetch(GOOGLE_YOUTUBE_API(pageToken));
    const json = await res.json();
    if (pageToken) {
      dispatch(appendVideos({ items: json.items, nextPageToken: json.nextPageToken }));
    } else {
      dispatch(setVideos({ items: json.items, nextPageToken: json.nextPageToken }));
    }
    dispatch(setFetching(false));
  };

  // Intersection Observer — triggers when sentinel div enters viewport
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !isFetching) {
          fetchVideos(nextPageToken);
        }
      },
      { rootMargin: "200px" } // start loading 200px before reaching the bottom
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [nextPageToken, isFetching]);

  if (data.length === 0) return (
    <div>
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex gap-3 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat}
              className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
              {cat}
            </button>
          ))}
        </div>
      </div>
      <ShimmerUI />
    </div>
  );

  return (
    <div>
      {/* Category chips */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex gap-3 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-3 py-4 sm:px-4 sm:py-6">
        {data.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        ))}

        {/* Loading shimmer for next page */}
        {isFetching && <BottomShimmer />}
      </div>

      {/* Sentinel — observed to trigger next page fetch */}
      <div ref={sentinelRef} className="h-4" />
    </div>
  );
};

export default MainContainer;
