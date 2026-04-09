import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

/* ── Logo mark ─────────────────────────────────────────────────────────────── */
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-violet-900/40">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
    <span className="text-xl font-black tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent hidden sm:block select-none">
      Wavely
    </span>
  </div>
);

const Header = () => {
  const dispatch      = useDispatch();
  const menuCondition = useSelector((app) => app.navCard.navbutton);
  const searchCache   = useSelector((store) => store.search);
  const { isDark, toggle } = useTheme();

  const [searchQuery,      setSearchQuery]      = useState("");
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [showSuggestions,  setShowSuggestions]  = useState(false);
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

  /* ── Mobile search overlay ─────────────────────────────────────────────── */
  if (mobileSearchOpen) {
    return (
      <header className="sticky top-0 z-50 flex items-center h-14 px-3 gap-2 bg-white/85 dark:bg-[#0d0d14]/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5">
        <button
          onClick={() => setMobileSearchOpen(false)}
          className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex flex-1 relative">
          <div className="flex w-full rounded-full overflow-hidden ring-2 ring-violet-500 shadow-md shadow-violet-200/50 dark:shadow-violet-900/30">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
              placeholder="Search Wavely..."
              className="flex-1 px-5 py-2 text-sm bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none"
            />
            <button
              onClick={getSearchResult}
              className="bg-violet-600 hover:bg-violet-700 px-4 flex items-center text-white transition-colors"
            >
              <SearchIcon />
            </button>
          </div>
          {showSuggestions && suggestionResult.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl mt-2 z-50 py-2 overflow-hidden">
              {suggestionResult.map((item, idx) => (
                <div key={idx} onMouseDown={() => setSearchQuery(item)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer text-gray-700 dark:text-[#f1f1f1] transition-colors">
                  <SearchIcon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }

  /* ── Main header ───────────────────────────────────────────────────────── */
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-3 sm:px-5 bg-white/85 dark:bg-[#0d0d14]/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5">

      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(isOpen())}
          className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Logo />
      </div>

      {/* Center — Search bar (desktop) */}
      <div className="hidden sm:flex items-center flex-1 max-w-[540px] mx-6 relative">
        <div className="flex w-full rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 focus-within:ring-2 focus-within:ring-violet-500 focus-within:shadow-md focus-within:shadow-violet-200/50 dark:focus-within:shadow-violet-900/30 transition-all duration-200">
          <div className="flex items-center pl-4 bg-gray-50 dark:bg-[#1a1a2e] text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
            placeholder="Search Wavely..."
            className="flex-1 pl-3 pr-4 py-2 text-sm bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none"
          />
          <button
            onClick={getSearchResult}
            className="bg-violet-600 hover:bg-violet-700 px-5 flex items-center text-white transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Voice search */}
        <button className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-[#1a1a2e] hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] flex-shrink-0 hidden md:flex items-center transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestionResult.length > 0 && (
          <div className="absolute top-full left-0 right-12 bg-white dark:bg-[#1a1a2e] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl mt-2 z-50 py-2 overflow-hidden">
            {suggestionResult.map((item, idx) => (
              <div key={idx} onMouseDown={() => setSearchQuery(item)}
                className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer text-gray-700 dark:text-[#f1f1f1] transition-colors">
                <SearchIcon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right — icons */}
      <div className="flex items-center gap-1">
        {/* Mobile search */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="sm:hidden p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] transition-colors"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] transition-colors"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-600 dark:text-[#aaa] transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full ring-2 ring-white dark:ring-[#0d0d14]" />
        </button>

        {/* Avatar */}
        <button className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-violet-200 dark:ring-violet-900/50">
          S
        </button>
      </div>
    </header>
  );
};

export default Header;
