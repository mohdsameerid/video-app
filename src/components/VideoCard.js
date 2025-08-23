import React from "react";

const VideoCard = ({ info }) => {
  //   console.log(info);
  //   console.log(info?.statistics.viewcCount);
  // const{snippet, statistics} = info;
  // const{channelTitle, title , thumbnails} = snippet;
  // const{viewCount} = statistics;
  //   const { snippet, statistics } = info;
  //   const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className=" m-2 w-96 shadow-lg rounded-lg">
      <img alt="img" src={info?.snippet?.thumbnails?.medium?.url} className="w-full rounded-t-lg" />
      <ul className="p-2">
        <li className="font-bold py-2 text-ellipsis">{info?.snippet?.title}</li>
        <li>{info?.snippet?.channelTitle}</li>
        <li>{info?.statistics.viewCount} Views</li>
      </ul>
      {/* <span>{title}</span>
            <span>{channelTitle}</span>
            <span>{viewCount}</span> */}
    </div>
  );
};
export default VideoCard;

/***
 * VideoCard
 *   -img
 *   -Title
 *   -Views
 *
 */
