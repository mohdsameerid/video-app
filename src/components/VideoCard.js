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
    <div className="p-2 m-2 w-60 shadow-lg rounded-lg">
      <img alt="img" src={info?.snippet?.thumbnails?.medium?.url} />
      <ul>
        <li className="font-bold py-2">{info?.snippet?.title}</li>
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
