import { useRef, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  console.log(user , role, token)
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const { dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login')
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ----------- Logo ----------- */}
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>

          {/* ----------- Logo ----------- */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(ifTheLinkIsActive) =>
                      ifTheLinkIsActive.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[800]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------- nav right ----------- */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex gap-2">
                <Link
                  to={
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }
                  // className="flex"
                  className="flex items-center gap-2 "
                >
                  <figure className="w-[45px] h-[45px] rounded-full cursor-pointer ">
                    <img
                      src={user?.photo}
                      className="w-full rounded-full"
                      alt="user avatar"
                    />
                  </figure>
                  <h2 className="text-xl">{user?.name}</h2>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primaryColor py-2 px-6 text-white font[600] h-[44px] flex items-center justify-center rounded-[50px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
