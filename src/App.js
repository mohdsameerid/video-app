import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import store from "./utils/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Body />
      <Footer />
    </Provider>
  );
}

export default App;
