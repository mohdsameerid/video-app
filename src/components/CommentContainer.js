import { useState } from "react";

const avatarColors = [
  "bg-red-500","bg-pink-500","bg-purple-500","bg-indigo-500",
  "bg-blue-500","bg-teal-500","bg-green-500","bg-orange-500",
];
const getAvatarColor = (name = "") => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return avatarColors[h % avatarColors.length];
};
const formatCount = (n) => {
  if (!n) return "";
  const v = parseInt(n);
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/,"") + "M";
  if (v >= 1_000)     return (v / 1_000).toFixed(1).replace(/\.0$/,"") + "K";
  return v.toString();
};

const CommentData = [
  { name: "Aarav Singh",    comment: "This video is absolutely fantastic! The production quality is top-notch.", replies: [
    { name: "Priya Mehta",  comment: "Totally agree! The editing is so smooth.", replies: [] },
    { name: "Rahul Gupta",  comment: "Been watching this channel for years — never disappoints.", replies: [
      { name: "Aarav Singh", comment: "Same here! Always great content.", replies: [] },
    ]},
  ]},
  { name: "Sneha Patel",    comment: "Just discovered this today and I'm already obsessed. Subscribed!", replies: [] },
  { name: "Vikram Nair",    comment: "The way this was explained makes it so easy to understand. Keep it up!", replies: [
    { name: "Divya Sharma", comment: "Right? I shared this with my whole class.", replies: [] },
  ]},
  { name: "Ananya Roy",     comment: "Bookmarking this for later. So much value packed into one video.", replies: [] },
  { name: "Karan Joshi",    comment: "This should have way more views. Underrated content fr.", replies: [] },
  { name: "Meera Iyer",     comment: "Thank you for putting this together. Very helpful and well-structured!", replies: [
    { name: "Arjun Kapoor", comment: "Agreed! The structure makes it easy to follow.", replies: [] },
  ]},
];

/* ─── single comment ─────────────────────────────────────────────────────── */
const Comment = ({ data, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(depth < 1);
  const [liked, setLiked]             = useState(false);
  const color   = getAvatarColor(data.name);
  const initial = data.name.charAt(0).toUpperCase();

  return (
    <div className={depth > 0 ? "ml-10 mt-3" : "mt-5"}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold`}>
          {initial}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 dark:text-[#f1f1f1]">{data.name}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-[#ccc] mt-0.5 leading-relaxed">{data.comment}</p>

          {/* Actions */}
          <div className="flex items-center gap-1 mt-1.5">
            <button
              onClick={() => setLiked((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                liked ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-gray-500 dark:text-[#aaa] hover:bg-gray-100 dark:hover:bg-[#272727]"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
              Like
            </button>
            <button className="px-2 py-1 rounded-full text-xs text-gray-500 dark:text-[#aaa] hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors">
              Reply
            </button>

            {data.replies?.length > 0 && (
              <button
                onClick={() => setShowReplies((p) => !p)}
                className="ml-1 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <svg className={`w-3.5 h-3.5 transition-transform ${showReplies ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {showReplies ? "Hide" : `${data.replies.length}`} {data.replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {/* Nested replies */}
          {showReplies && data.replies?.length > 0 && (
            <div>
              {data.replies.map((reply, i) => (
                <Comment key={i} data={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── main container ─────────────────────────────────────────────────────── */
const CommentContainer = ({ viewCount }) => {
  const count = formatCount(viewCount);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-[#f1f1f1]">
          Comments{count ? ` · ${count}` : ""}
        </h2>
      </div>

      {/* Write a comment */}
      <div className="flex gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          S
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border-b-2 border-gray-200 dark:border-[#3f3f3f] bg-transparent text-sm text-gray-900 dark:text-[#f1f1f1] placeholder-gray-400 dark:placeholder-[#777] pb-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-100 dark:border-[#3f3f3f] mb-2" />

      {/* Comment list */}
      {CommentData.map((comment, idx) => (
        <Comment key={idx} data={comment} depth={0} />
      ))}
    </div>
  );
};

export default CommentContainer;
