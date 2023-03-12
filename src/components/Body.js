import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";

const Body = () => {
  const toggleMenu = useSelector((app) => app.navCard.navbutton);
//   console.log(toggleMenu);
  return (
    <div className="flex">
      {toggleMenu ? <SideContainer /> : ""}

      <MainContainer />
    </div>
  );
};
export default Body;
