const avatarColors = [
  "bg-red-500","bg-pink-500","bg-purple-500","bg-indigo-500",
  "bg-blue-500","bg-teal-500","bg-green-500","bg-orange-500",
];
const getAvatarColor = (name = "") => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return avatarColors[h % avatarColors.length];
};

const LiveChatMessage = ({ name, comments }) => {
  const color   = getAvatarColor(name);
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors">
      <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
        {initial}
      </div>
      <div className="min-w-0">
        <span className="text-xs font-semibold text-gray-900 dark:text-[#f1f1f1] mr-1.5">{name}</span>
        <span className="text-xs text-gray-600 dark:text-[#aaa] break-words">{comments}</span>
      </div>
    </div>
  );
};

export default LiveChatMessage;
