import "./Navbar.scss";
import logo from "../../assets/formula.png";
import { NavLink } from "react-router-dom";
import helmet from "../../assets/helmet.png";
import teams2 from "../../assets/teams2.png";
import flags from "../../assets/flags.png";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <ul>
        <li>
          <NavLink to='/drivers' className={({isActive}) => {
            return ('navLink ' + (isActive ? 'activeLink' : ''))
          }}>
            <img src={helmet} alt='helmet' className="navbarIcon" /> Drivers
          </NavLink>
        </li>
        <li>
          <NavLink to='/teams' className={({isActive}) => {
            return ('navLink ' + (isActive ? 'activeLink' : ''))
          }}>
            <img src={teams2} alt='teams2' className="navbarIcon" /> Teams
          </NavLink>
        </li>
        <li>
          <NavLink to='/races' className={({isActive}) => {
            return ('navLink ' + (isActive ? 'activeLink' : ''))
          }}>
            <img src={flags} alt='flags' className="navbarIcon" /> Races
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
