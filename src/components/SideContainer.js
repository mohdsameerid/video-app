import React from "react";

const Subscribtion = () => (
  <div className="m-2 pt-2">
    <h1 className="font-bold">Subscribtion</h1>
    <ul>
      <li>Home</li>
      <li>Music</li>
      <li>Video</li>
      <li>Audio</li>
    </ul>
  </div>
);
const Home = () => (
  <div className="m-2 pt-2">
    <h1 className="font-bold">Home</h1>
    <ul>
      <li>Home</li>
      <li>Music</li>
      <li>Video</li>
      <li>Audio</li>
    </ul>
  </div>
);
const Shorts = () => (
  <div className="m-2 pt-2">
    <h1 className="font-bold">Shorts</h1>
    <ul>
      <li>Home</li>
      <li>Music</li>
      <li>Video</li>
      <li>Audio</li>
    </ul>
  </div>
);
const SideContainer = () => {
  return (
    <div className="m-2 p-2 shadow-lg pr-16">
      <Home />
      <Shorts />
      <Subscribtion />
    </div>
  );
};
export default SideContainer;
