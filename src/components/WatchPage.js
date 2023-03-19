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
    <div className="m-2 px-5 ">
      <div className="flex w-full ">
        <iframe
          className=""
          width="800"
          height="450"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="flex flex-col">
          <div className=" w-[386px] font-bold m-18 p-3 bg-gray-300 bg-fixed rounded-sm ml-5">
            <h1>Live Chat</h1>
          </div>
          <span className="w-[386px] h-[25rem] mx-5 p-1 shadow-lg border border-gray-400 bg-slate-100 rounded-sm overflow-y-scroll flex flex-col-reverse">
            <LiveChat />
          </span>
        </div>
      </div>
      {/* <div className="text-right mr-7">
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-l-md w-[18rem]"
        ></input>
        <button
          className="bg-red-300 p-2 rounded-r-md border border-red-400"
          placeholder="Send"
        >
          send
        </button>
      </div> */}

      <div className="w-[900px]">
        <CommentContainer />
      </div>
    </div>
  );
};
export default WatchPage;
