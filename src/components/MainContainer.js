import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GOOGLE_YOUTUBE_API } from "../config";
import VideoCard from "./VideoCard";
import ShimmerUI from "./ShimmerUI";

const CATEGORIES = [
  "All", "Mixes", "Podcasts", "Live", "Music", "Gaming",
  "News", "Cooking", "Sports", "Technology", "Fashion", "Travel", "Comedy", "Learning",
];

const MainContainer = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = async () => {
    const res = await fetch(GOOGLE_YOUTUBE_API);
    const videoData = await res.json();
    setData(videoData.items);
  };

  const isLoading = data.length === 0;

  return (
    <div>
      {/* Category chips — sticky, matches YouTube exactly */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div
          className="flex gap-3 px-4 py-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
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

      {/* Video grid or shimmer — same container, same width */}
      {isLoading ? (
        <ShimmerUI />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-3 py-4 sm:px-4 sm:py-6">
          {data.map((video) => (
            <Link key={video.id} to={"/watch?v=" + video.id}>
              <VideoCard info={video} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContainer;
