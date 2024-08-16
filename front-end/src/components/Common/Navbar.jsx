import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/LogoMentorVate.png";
import { toast } from "react-hot-toast";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/apis";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = (props) => {
  // let isLoggedIn = props.isLoggedIn;
  // let SetIsLoggedIn = props.SetIsLoggedIn;

  // const Sublink = [
  //   {
  //     title: "python",
  //     link: "course/python"
  //   },
  //   {
  //     title: "webdev",
  //     link: "course/Web-development"
  //   },
  // ]

  const { token } = useSelector((state) => state.auth);
  // console.log("token",token);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const MatchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [sublink, setSubLink] = useState([]);

  const fetchCatalog = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("result",result);
      //  console.log("catalog" , result?.data?.data);
      setSubLink(result?.data?.data);
      // console.log("sublink" , sublink);
    } catch (error) {
      console.log("could not fetch the catalog list");
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <div className="border-b-[1px] border-richblack-700 ">
      <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto ">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={120}
            height={28}
            loading="lazy"
            className=" scale-150 px-1"
          />
        </Link>

        <nav>
          <ul className="text-richblack-100 flex gap-x-6">
            {NavbarLinks.map((ele, index) => {
              return (
                <li key={index} className={`cursor-pointer `}>
                  {ele.title === "Catalog" ? (
                    <div className="flex flex-row gap-1 items-center relative group">
                      <p>{ele.title}</p>
                      <IoIosArrowDown />

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {sublink?.length > 0 ? (
                          <div>
                            {sublink.map((ele, index) => {
                              return (
                                <Link
                                  to={`catalog/${ele.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                >
                                  <div
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={index}
                                  >
                                    {ele.name}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className=" text-black">No course Found</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={ele?.path}
                      className={`${
                        MatchRoute(ele?.path)
                          ? " text-yellow-50"
                          : " text-white"
                      } lg:block hidden`}
                    >
                      {ele?.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login - SignUp - LogOut - Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className=" px-3">
              <AiOutlineShoppingCart className="text-white text-3xl   " />
              {totalItems > 0 && (
                <span className=" absolute top-8  rounded-full text-center px-1 animate-bounce bg-yellow-5 text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/Signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
