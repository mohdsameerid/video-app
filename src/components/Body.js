import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";
// import ButtonList from "./ButtonList"
const Body = () => {
  const toggleMenu = useSelector((app) => app.navCard.navbutton);
  //   console.log(toggleMenu);
  return (
    <div className="flex">
      {toggleMenu ? <SideContainer /> : ""}

      {/* <ButtonList /> */}
      <MainContainer />
    </div>
  );
};
export default Body;
