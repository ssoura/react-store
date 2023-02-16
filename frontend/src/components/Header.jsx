import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header
      className={`bg-gradient-to-r from-blue-700 to-indigo-900 transform shadow-xl sticky top-0 z-10 animate-dropIn`}
    >
      <div className="max-w-6xl mx-auto p-3 flex items-center space-x-4">
        <h1 className="text-white w-10">
          <Link to="/">shopping</Link>
        </h1>
        <div className="flex-1">
          <Routes>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Routes>
        </div>
        <div className="flex space-x-4 hidden sm:block">
          <Link to="/cart">
            <span className="text-white">
              <i className="fas fa-shopping-cart"></i> Cart
            </span>
          </Link>
          {userInfo ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="text-white m-1">
                  {userInfo.name}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
                >
                  <li>
                    <a className="block px-4 py-2">Item 1</a>
                  </li>
                  <li>
                    <Link className="block px-4 py-2" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={logoutHandler}
                      href="#"
                      className="block px-4 py-2"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login">
              <span className="text-white">
                <i className="fas fa-user"></i> Sign In
              </span>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <Link to="/admin/userlist">Users</Link>
              <Link to="/admin/productlist">Products</Link>
              <Link to="/admin/orderlist">Orders</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
