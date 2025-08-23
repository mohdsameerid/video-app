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
          message: messageGenerate(20) + " 🚀",
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
        className="bg-fixed flex w-full px-2 mt-2"
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
          className="flex-1 border border-gray-400 p-2 rounded-l-md"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-red-300 p-2 rounded-r-md border border-red-400"
        >
          Send
        </button>
      </form>

    </div>
  );
};
export default LiveChat;
