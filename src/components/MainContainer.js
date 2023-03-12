import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="flex flex-wrap  px-5 pl-10">
      {data.map((videos) => (
        <Link key={videos.id} to={"/watch?v=" + videos.id}>
          <VideoCard info={videos} />
        </Link>
      ))}
    </div>
  );
};
export default MainContainer;
