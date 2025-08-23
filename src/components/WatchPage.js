import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeNavbar } from "../utils/navSlice";
import CommentContainer from "./CommentContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeNavbar());
  }, []);

  const [searchParams] = useSearchParams();
  //   console.log(searchParam.get("v"));
  return (
    <div className="m-2 px-5">
      {/* Video + Chat Section */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Video Player */}
        <div className="w-full lg:w-[800px]">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Live Chat */}
        <div className="flex flex-col w-full lg:w-[386px] mt-4 lg:mt-0 lg:ml-5">
          <div className="font-bold p-3 bg-gray-300 rounded-sm">
            <h1>Live Chat</h1>
          </div>
          <span className="h-[25rem] mt-2 p-1 shadow-lg border border-gray-400 bg-slate-100 rounded-sm overflow-y-scroll flex flex-col-reverse">
            <LiveChat />
          </span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-[900px] mt-6">
        <CommentContainer />
      </div>
    </div>
  );
};
export default WatchPage;
