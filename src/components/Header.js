import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.PNG";
import { isOpen } from "../utils/navSlice";
import Menuoff from "../assets/MenuOff.PNG";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../config";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const menuCondition = useSelector((app) => app.navCard.navbutton);
  //   console.log("Menu condition : " + menuCondition);
  const hendleMenuToggle = () => {
    dispatch(isOpen());
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionResult, setSuggestionResult] = useState([]);
  // console.log(suggestionResult);
  const [showHideSuggestion, setShowHideSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);

  /**caching
   *
   * if(cache)
   *   setSuggestionResult();
   * else
   *   getSearchResult();
   *
   */
  useEffect(() => {
    // console.log(searchQuery);
    //API call after every 500 mili sec.
    const timer = setTimeout(() => {
      if (searchCache[searchQuery])
        setSuggestionResult(searchCache[searchQuery]);
      else {
        // getSearchResult();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchResult = async () => {
    // console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery);
    const json = await data.json();
    // console.log(json);
    setSuggestionResult(json[1]);

    // cache result in redux
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row m-2 p-3 justify-between items-center">
        {/* Left: Menu Icon + Logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          <span>
            {menuCondition ? (
              <img
                onClick={() => hendleMenuToggle()}
                className="h-10 mr-0 cursor-pointer"
                alt="Hum-burger-icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
              />
            ) : (
              <img
                onClick={() => hendleMenuToggle()}
                className="h-6 mt-1 mr-0 cursor-pointer"
                alt="Hum-burger-icon"
                src={Menuoff}
              />
            )}
          </span>
          <span className="ml-2">
            <img className="h-10" alt="Wetube" src={logo} />
          </span>
        </div>

        {/* Center: Search */}
        <div className="mr-0 sm:mr-52 w-full sm:w-auto mb-2 sm:mb-0">
          <div className="flex">
            <input
              className="border border-gray-300 bg-gray-100 w-full sm:w-[550px] p-2 px-4 rounded-l-2xl"
              placeholder="Search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowHideSuggestion(true)}
              onBlur={() => setShowHideSuggestion(false)}
            />
            <button className="border border-gray-300 bg-gray-200 p-2 rounded-r-2xl text-white cursor-pointer w-16">
              🔍
            </button>
          </div>

          {showHideSuggestion && (
            <div className="fixed bg-white w-[34.5rem] border border-gray-600 rounded-lg mt-1 z-10">
              <ul>
                {suggestionResult.map((SearchRes, idx) => (
                  <li
                    key={idx}
                    className="font-semibold my-1 p-1.5 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    🔍 {SearchRes}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: User Icon */}
        <div>
          <span>
            <img
              className="h-8"
              alt="Usericon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas9ZerN0eVpHSiZomHonwW3s8kjfrQy2aajkQRNWU&s"
            />
          </span>
        </div>
      </div>
    </div>

  );
};

export default Header;
