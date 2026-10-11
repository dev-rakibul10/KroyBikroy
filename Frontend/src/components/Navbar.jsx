import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ThemeToggle from "./ThemeToggler";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/collections", label: "COLLECTIONS" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.dark_logo} alt="logo" className="w-36 dark:invert" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-fg">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="flex flex-col items-center gap-1"
          >
            <p>{link.label}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-fg hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <img
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon}
          className="w-5 cursor-pointer dark:invert"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer dark:invert"
            alt=""
          />

          {/* Dropdown in the Navbar */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-soft text-muted rounded">
                <p className="cursor-pointer hover:text-fg">MyProfile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-fg"
                >
                  Orders
                </p>
                <p onClick={logOut} className="cursor-pointer hover:text-fg">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 dark:invert"
            alt=""
          />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-primary text-primary-fg aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden dark:invert"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-page transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-muted">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 dark:invert"
              alt=""
            />
            <p>Back</p>
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
