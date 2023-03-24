const YOUTUBE_API_KEY = "AIzaSyBrFZBavzJPg_wppLje-V2T_MwFlyH9EVI";

export const GOOGLE_YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

// API polling  >>>>>>  Infinite Scroll >>>> pagination

export const LIVE_MESSAGE_CHAT = 30;
