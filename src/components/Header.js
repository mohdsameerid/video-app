import React from "react";
import logo from "../assets/logo.PNG";

const Header = () => {
  return (
    <div className="shadow-lg">
      <div className="grid grid-flow-col m-2 p-2">
        <div className="flex col-span-2">
          <span className="">
            <img
              className="h-10 mr-0 cursor-pointer"
              alt="Hum-burger-icon"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
            />{" "}
          </span>
          <span>
            <img className="h-10" alt="Wetube" src={logo}></img>
          </span>
        </div>
        <div className="col-span-8 ">
          <span className="">
            <input
              className="border-gray-400 bg-gray-50 w-1/2 p-2 rounded-l-2xl"
              type="text"
            />
            <button className="bg-gray-200 p-2 rounded-r-2xl text-white cursor-pointer">
              🔍
            </button>
          </span>
        </div>
        <div className="col-span-2">
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
