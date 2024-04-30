import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authslice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <aside className="menu has-shadow pl-2">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink
              to={"/dashboard"}
              className="is-flex is-align-items-center "
            >
              <IoHome /> Dashboard
            </NavLink>
          </li>
        </ul>

        {user && user.role.name !== "Point de vente" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/affectation"}>
                  <IoPricetag /> Affectation sim
                </NavLink>
              </li>
              <li>
                <NavLink to={"/recuperation"}>
                  <IoPerson /> Recuperation sim
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
