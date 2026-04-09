import Header from "./components/Header";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import ShortsPage from "./components/ShortsPage";
import CategoryPage from "./components/CategoryPage";
import ComingSoon from "./components/ComingSoon";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/",             element: <MainContainer /> },
      { path: "watch",         element: <WatchPage /> },
      { path: "shorts",        element: <ShortsPage /> },

      /* ── Explore — real API pages ── */
      { path: "trending",      element: <CategoryPage title="Trending"  categoryId=""   accent="red"    icon="🔥" /> },
      { path: "music",         element: <CategoryPage title="Music"     categoryId="10" accent="purple" icon="🎵" /> },
      { path: "gaming",        element: <CategoryPage title="Gaming"    categoryId="20" accent="green"  icon="🎮" /> },
      { path: "news",          element: <CategoryPage title="News"      categoryId="25" accent="blue"   icon="📰" /> },
      { path: "sports",        element: <CategoryPage title="Sports"    categoryId="17" accent="orange" icon="⚽" /> },

      /* ── You — coming soon (require sign-in) ── */
      { path: "subscriptions", element: <ComingSoon title="Subscriptions" icon="📺" description="Sign in to see the latest videos from channels you follow." /> },
      { path: "history",       element: <ComingSoon title="History"       icon="🕐" description="Videos you've watched will appear here once sign-in is supported." /> },
      { path: "playlists",     element: <ComingSoon title="Playlists"     icon="📋" description="Your playlists will show up here. Sign-in support is on the way." /> },
      { path: "watch-later",   element: <ComingSoon title="Watch Later"   icon="⏰" description="Save videos to watch later. Sign-in support is on the way." /> },
      { path: "liked",         element: <ComingSoon title="Liked Videos"  icon="👍" description="Videos you've liked will appear here once sign-in is supported." /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      {/* Header is sticky — sticks to top as page scrolls */}
      <Header />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
