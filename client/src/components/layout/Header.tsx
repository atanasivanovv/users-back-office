import { NavLink } from "react-router-dom";

const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-gray-800 font-bold hover:text-black"
    : "text-gray-800 hover:text-black";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="flex justify-between mx-auto px-8 py-4">
        <h2 className="text-xl text-gray-800">
          <i className="fa-solid fa-suitcase mr-2" />
          Users Back Office
        </h2>
        <ul className="flex space-x-4 text-lg">
          <li>
            <NavLink to="/users" className={getLinkClasses}>
              USERS
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={getLinkClasses}>
              TASKS
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
