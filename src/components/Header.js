import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.PNG";
import { isOpen } from "../utils/navSlice";
import Menuoff from "../assets/MenuOff.PNG";

const Header = () => {
  const dispatch = useDispatch();
  const menuCondition = useSelector((app) => app.navCard.navbutton);
//   console.log("Menu condition : " + menuCondition);
  const hendleMenuToggle = () => {
    dispatch(isOpen());
  };
  return (
    <div className="">
      <div className="f m-2 p-3 flex justify-between">
        <div className="flex ">
          <span className="">
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
                className="h-7 mt-1 mr-0 cursor-pointer"
                alt="Hum-burger-icon"
                src={Menuoff}
              />
            )}
          </span>
          <span>
            <img className="h-10" alt="Wetube" src={logo}></img>
          </span>
        </div>
        <div className="mr-52">
          <span className="">
            <input
              className="border-gray-400 bg-gray-50 w-[550px] p-2 rounded-l-2xl"
              type="text"
            />
            <button className="bg-gray-200 p-2 rounded-r-2xl text-white cursor-pointer">
              🔍
            </button>
          </span>
        </div>
        <div className="">
          <span>
            {" "}
            <img
              className="h-8"
              alt="Usericon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas9ZerN0eVpHSiZomHonwW3s8kjfrQy2aajkQRNWU&s"
            ></img>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
