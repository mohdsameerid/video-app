import React, { useEffect, useState } from "react";
import { GOOGLE_YOUTUBE_API } from "../config";
import VideoCard from "./VideoCard";

const MainContainer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getVideoData();
  }, []);
  const getVideoData = async () => {
    const data = await fetch(GOOGLE_YOUTUBE_API);
    const videoData = await data.json();
    // console.log(videoData);
    setData(videoData.items);
  };
  return (
    <div className="flex flex-wrap justify-between px-5">
      {data.map((videos) => (
        <VideoCard info={videos} />
      ))}
    </div>
  );
};
export default MainContainer;
