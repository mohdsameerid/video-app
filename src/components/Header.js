import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.PNG";
import { isOpen } from "../utils/navSlice";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../config";
import { cacheResults } from "../utils/searchSlice";
import useTheme from "../utils/useTheme";

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Header = () => {
  const dispatch = useDispatch();
  const menuCondition = useSelector((app) => app.navCard.navbutton);
  const searchCache = useSelector((store) => store.search);
  const { isDark, toggle } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) setSuggestionResult(searchCache[searchQuery]);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchResult = async () => {
    const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery);
    const json = await data.json();
    setSuggestionResult(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  /* ── Mobile search overlay ── */
  if (mobileSearchOpen) {
    return (
      <header className="sticky top-0 z-50 flex items-center h-14 px-3 bg-white dark:bg-[#212121] border-b border-gray-200 dark:border-[#3f3f3f] gap-2">
        <button onClick={() => setMobileSearchOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex flex-1 relative">
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
            placeholder="Search YouTube"
            className="flex-1 border border-gray-300 dark:border-[#3f3f3f] border-r-0 rounded-l-full px-4 py-2 text-sm bg-white dark:bg-[#121212] dark:text-[#f1f1f1] focus:outline-none focus:border-blue-500"
          />
          <button onClick={getSearchResult} className="border border-gray-300 dark:border-[#3f3f3f] bg-gray-50 dark:bg-[#272727] px-4 rounded-r-full flex items-center dark:text-[#f1f1f1]">
            <SearchIcon />
          </button>
          {showSuggestions && suggestionResult.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#3f3f3f] rounded-xl shadow-lg mt-1 z-50 py-2">
              {suggestionResult.map((item, idx) => (
                <div key={idx} onMouseDown={() => setSearchQuery(item)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] cursor-pointer dark:text-[#f1f1f1]">
                  <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-3 sm:px-4 bg-white dark:bg-[#212121] border-b border-gray-200 dark:border-[#3f3f3f]">

      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => dispatch(isOpen())} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src={logo} alt="WeTube" className="h-6 sm:h-7" />
      </div>

      {/* Center — Search bar (hidden on mobile) */}
      <div className="hidden sm:flex items-center flex-1 max-w-[600px] mx-4 relative">
        <div className="flex w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
            placeholder="Search"
            className="flex-1 border border-gray-300 dark:border-[#3f3f3f] border-r-0 rounded-l-full px-5 py-2 text-sm bg-white dark:bg-[#121212] dark:text-[#f1f1f1] dark:placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button onClick={getSearchResult}
            className="border border-gray-300 dark:border-[#3f3f3f] bg-gray-50 dark:bg-[#272727] hover:bg-gray-100 dark:hover:bg-[#3f3f3f] px-5 rounded-r-full flex items-center justify-center dark:text-[#f1f1f1]">
            <SearchIcon />
          </button>
        </div>
        {/* Voice */}
        <button className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-[#272727] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] flex-shrink-0 hidden md:flex items-center text-gray-700 dark:text-[#f1f1f1]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
        {/* Suggestions */}
        {showSuggestions && suggestionResult.length > 0 && (
          <div className="absolute top-full left-0 right-12 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#3f3f3f] rounded-xl shadow-lg mt-1 z-50 py-2">
            {suggestionResult.map((item, idx) => (
              <div key={idx} onMouseDown={() => setSearchQuery(item)}
                className="flex items-center gap-4 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] cursor-pointer dark:text-[#f1f1f1]">
                <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right — icons */}
      <div className="flex items-center gap-1">
        {/* Mobile: search icon */}
        <button onClick={() => setMobileSearchOpen(true)} className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]">
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        <button onClick={toggle} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Create */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden md:inline">Create</span>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>

        {/* Avatar */}
        <button className="ml-1">
          <img className="h-8 w-8 rounded-full object-cover" alt="User"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas9ZerN0eVpHSiZomHonwW3s8kjfrQy2aajkQRNWU&s" />
        </button>
      </div>
    </header>
  );
};

export default Header;
