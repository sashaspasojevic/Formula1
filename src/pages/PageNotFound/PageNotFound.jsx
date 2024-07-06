import { Link } from "react-router-dom";
import "./PageNotFound.scss";
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const PageNotFound = () => {
  return (
    <div className="notFound">
      <p>Page Not Found 😔</p>
      <Link to='/' className="btn"><img src={back_arrow_icon} alt="back arrow icon" /> Please go back</Link>
    </div>
  );
};

export default PageNotFound;
