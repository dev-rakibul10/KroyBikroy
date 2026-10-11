import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.dark_logo} className="mb-5 w-32 dark:invert" alt="" />
          <p className="w-full md:w-2/3 text-muted">
            Football-inspired fashion for every day. We pick quality pieces,
            pack every order with care, and deliver across Bangladesh with easy
            exchanges and 7-day returns.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-fg">
                About us
              </Link>
            </li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-muted">
            <li>+880-1310842691</li>
            <li>contact@protonmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-muted">
          Copyright @2026 KroYBikroy.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
