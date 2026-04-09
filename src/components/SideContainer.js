import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { isOpen as isOpenAction } from "../utils/navSlice";
import logo from "../assets/logo.PNG";

const Icon = ({ d }) => (
  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

const ICONS = {
  home:      "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  shorts:    "M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-1.03-2.5-3.35-4.32-6.1-4.32A7 7 0 1012 19a7 7 0 006.7-4.97l-1.56-.54A5.5 5.5 0 1112 6.5c2.08 0 3.85 1.15 4.79 2.85L15 10l4.99 1-.22-5-1 1.32z",
  subs:      "M10 18v-2.5l5 2.5-5 2.5V18zm10-11H4v10h16V7zm2-4H2v2h20V3zM2 21h20v-2H2v2z",
  history:   "M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
  playlist:  "M3 9h2v2H3V9zm0 4h2v2H3v-2zm0-8h2v2H3V5zm4 0h14v2H7V5zm0 8h14v2H7v-2zm0-4h14v2H7V9z",
  watchlater:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  liked:     "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
  trending:  "M17.53 11.2c-.23-.3-.5-.56-.77-.82-.81-.76-1.74-1.28-2.61-1.87-.96-.63-2.14-1.37-2.99-2.29-.17.61-.25 1.25-.2 1.9.06.9.37 1.74.8 2.5-.46-.24-.93-.52-1.35-.87-.87-.72-1.51-1.71-1.68-2.84-.06-.43-.08-.88 0-1.31-.87.7-1.56 1.64-1.97 2.65-.69 1.66-.72 3.56-.09 5.26.2.54.46 1.06.79 1.53.33.47.73.9 1.19 1.24.91.71 2.03 1.08 3.17 1.1 1.26.04 2.52-.34 3.51-1.1.97-.74 1.61-1.87 1.76-3.07.08-.6.03-1.22-.16-1.81-.1-.31-.24-.6-.4-.85z",
  music:     "M12 3v10.55A4 4 0 1014 17V7h4V3h-6z",
  gaming:    "M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z",
  news:      "M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z",
  sports:    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z",
};

const FullNavItem = ({ iconKey, label, to = "/" }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to}>
      <div className={`flex items-center gap-6 px-3 h-10 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
        active ? "bg-gray-100 dark:bg-[#3f3f3f] font-semibold" : "hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]"
      }`}>
        <Icon d={ICONS[iconKey]} />
        <span className="truncate">{label}</span>
      </div>
    </Link>
  );
};

const MiniNavItem = ({ iconKey, label, to = "/" }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to}>
      <div className={`flex flex-col items-center justify-center gap-1 w-full py-3 rounded-xl cursor-pointer transition-colors ${
        active ? "bg-gray-100 dark:bg-[#3f3f3f] font-semibold" : "hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#f1f1f1]"
      }`}>
        <Icon d={ICONS[iconKey]} />
        <span className="text-[10px] font-medium leading-tight text-center">{label}</span>
      </div>
    </Link>
  );
};

const Divider = () => <hr className="my-3 border-gray-200 dark:border-[#3f3f3f]" />;
const SectionLabel = ({ label }) => (
  <p className="px-3 pt-2 pb-1 text-sm font-semibold text-gray-900 dark:text-[#f1f1f1]">{label}</p>
);

const SideContainer = () => {
  const isMenuOpen = useSelector((app) => app.navCard.navbutton);
  const dispatch = useDispatch();

  const fullSidebarContent = (
    <>
      <FullNavItem iconKey="home"        label="Home"          to="/" />
      <FullNavItem iconKey="shorts"      label="Shorts"        to="/shorts" />
      <FullNavItem iconKey="subs"        label="Subscriptions" to="/subscriptions" />
      <Divider />
      <SectionLabel label="You" />
      <FullNavItem iconKey="history"     label="History"       to="/history" />
      <FullNavItem iconKey="playlist"    label="Playlists"     to="/playlists" />
      <FullNavItem iconKey="watchlater"  label="Watch later"   to="/watch-later" />
      <FullNavItem iconKey="liked"       label="Liked videos"  to="/liked" />
      <Divider />
      <SectionLabel label="Explore" />
      <FullNavItem iconKey="trending"    label="Trending"      to="/trending" />
      <FullNavItem iconKey="music"       label="Music"         to="/music" />
      <FullNavItem iconKey="gaming"      label="Gaming"        to="/gaming" />
      <FullNavItem iconKey="news"        label="News"          to="/news" />
      <FullNavItem iconKey="sports"      label="Sports"        to="/sports" />
    </>
  );

  return (
    <>
      {/* ── MOBILE: overlay drawer (shown when open, hidden when closed) ── */}
      {isMenuOpen && (
        <div className="sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => dispatch(isOpenAction())}
          />
          {/* Drawer */}
          <aside className="slide-in-left fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#212121] shadow-xl overflow-y-auto px-2">
            {/* Logo row inside drawer */}
            <div className="flex items-center gap-2 px-1 h-14">
              <button onClick={() => dispatch(isOpenAction())} className="p-2 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <img src={logo} alt="WeTube" className="h-6" />
            </div>
            {fullSidebarContent}
          </aside>
        </div>
      )}

      {/* ── DESKTOP mini sidebar (sm+, closed state) ── */}
      {!isMenuOpen && (
        <aside className="hidden sm:flex flex-col w-[72px] flex-shrink-0 sticky top-14 self-start h-[calc(100vh-56px)] overflow-y-auto py-2 px-1 bg-white dark:bg-[#212121] border-r border-gray-100 dark:border-[#3f3f3f]">
          <MiniNavItem iconKey="home"    label="Home"          to="/" />
          <MiniNavItem iconKey="shorts"  label="Shorts"        to="/shorts" />
          <MiniNavItem iconKey="subs"    label="Subscriptions" to="/subscriptions" />
          <MiniNavItem iconKey="history" label="History"       to="/history" />
          <MiniNavItem iconKey="liked"   label="Liked"         to="/liked" />
        </aside>
      )}

      {/* ── DESKTOP full sidebar (sm+, open state) ── */}
      {isMenuOpen && (
        <aside className="hidden sm:flex flex-col w-60 flex-shrink-0 sticky top-14 self-start h-[calc(100vh-56px)] overflow-y-auto py-3 px-2 bg-white dark:bg-[#212121] border-r border-gray-100 dark:border-[#3f3f3f]">
          {fullSidebarContent}
        </aside>
      )}
    </>
  );
};

export default SideContainer;
