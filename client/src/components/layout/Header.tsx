import { NavLink } from "react-router-dom";

const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-primary-500 font-bold hover:text-primary-700"
    : "text-primary-500 hover:text-primary-700";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="flex justify-between mx-auto px-8 py-4">
        <h2 className="text-xl text-primary-500">
          <i className="fa-solid fa-suitcase mr-2" />
          Users Back Office
        </h2>
        <ul className="flex space-x-4 text-lg">
          <li>
            <NavLink to="/" className={getLinkClasses}>
              HOME
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
