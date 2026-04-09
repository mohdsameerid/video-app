const YOUTUBE_API_KEY = "AIzaSyBrFZBavzJPg_wppLje-V2T_MwFlyH9EVI";

export const GOOGLE_YOUTUBE_API = (categoryId = "", pageToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=16&regionCode=IN${categoryId ? `&videoCategoryId=${categoryId}` : ""}${pageToken ? `&pageToken=${pageToken}` : ""}&key=${YOUTUBE_API_KEY}`;

export const YOUTUBE_SHORTS_API = (pageToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&q=%23shorts&maxResults=20&regionCode=IN${pageToken ? `&pageToken=${pageToken}` : ""}&key=${YOUTUBE_API_KEY}`;

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "https://corsanywhere.herokuapp.com/https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

// API polling  >>>>>>  Infinite Scroll >>>> pagination

export const LIVE_MESSAGE_CHAT = 30;
