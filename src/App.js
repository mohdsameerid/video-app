import Header from "./components/Header";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import ShortsPage from "./components/ShortsPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path: "shorts", element: <ShortsPage /> },
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
