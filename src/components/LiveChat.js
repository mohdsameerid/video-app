import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import LiveChatMessage from "./LiveChatMessage";
import { nameGenerate, messageGenerate } from "../utils/helper";

const LiveChat = () => {
  const dispatch    = useDispatch();
  const messages    = useSelector((store) => store.chat.message);
  const [text, setText]   = useState("");
  const chatBodyRef = useRef(null);

  /* auto-scroll chat container only — never touches page scroll */
  useEffect(() => {
    const el = chatBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  /* simulate live chat messages */
  useEffect(() => {
    const id = setInterval(() => {
      dispatch(addMessage({ name: nameGenerate(), message: messageGenerate(20) + " 🚀" }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addMessage({ name: "You", message: text.trim() }));
    setText("");
  };

  return (
    <div className="flex flex-col h-[500px] lg:h-[calc(100vh-180px)] rounded-2xl border border-gray-200 dark:border-[#3f3f3f] bg-white dark:bg-[#212121] overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-[#3f3f3f]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <h2 className="text-sm font-bold text-gray-900 dark:text-[#f1f1f1]">Live Chat</h2>
        <span className="ml-auto text-xs text-gray-400 dark:text-[#aaa]">{messages.length} messages</span>
      </div>

      {/* Messages */}
      <div ref={chatBodyRef} className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, idx) => (
          <LiveChatMessage key={idx} name={msg.name} comments={msg.message} />
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-center gap-2 px-3 py-3 border-t border-gray-200 dark:border-[#3f3f3f]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something..."
          className="flex-1 bg-gray-100 dark:bg-[#272727] text-sm text-gray-900 dark:text-[#f1f1f1] placeholder-gray-400 dark:placeholder-[#777] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-white rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
