import { Outlet } from "react-router-dom";

import SideContainer from "./SideContainer";
// import ButtonList from "./ButtonList"
const Body = () => {
  return (
    <div className="flex">
      <SideContainer />
      {/* <ButtonList /> */}
      <Outlet />
    </div>
  );
};
export default Body;
