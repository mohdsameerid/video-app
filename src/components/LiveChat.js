import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import LiveChatMessage from "./LiveChatMessage";
import { nameGenerate, messageGenerate } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const message = useSelector((store) => store.chat.message);

  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      //api polling
      //   console.log("Api Polling");
      dispatch(
        addMessage({
          name: nameGenerate(),
          message: messageGenerate(20) + "🚀",
        })
      );
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div className="w-full ">
      <div>
        {message.map((e, idx) => (
          <LiveChatMessage key={idx} name={e.name} comments={e.message} />
        ))}
      </div>

      <form
        className=" bg-fixed flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Chat Message: " + liveMessage);
          dispatch(
            addMessage({
              name: "Samir",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-l-md w-[18rem]"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        ></input>
        <hr></hr>
        <button
          className="bg-red-300 p-2 rounded-r-md border border-red-400"
          placeholder="Send"
        >
          send
        </button>
      </form>
    </div>
  );
};
export default LiveChat;
