import { useContext } from "react";
import { PostContext } from "../../services/PostContext";
import Flag from "react-flagkit";
import { Link } from "react-router-dom";


const TableDrivers = ({ driver }) => {
  const { position, Driver, Constructors, points } = driver;

  let name = Driver.givenName;
  let familyName = Driver.familyName;
  let nationality = Driver.nationality;
  let team = Constructors[0].name;
  let id = Driver.driverId;
  

  const { oneFlag } = useContext(PostContext);

  

  oneFlag(nationality);
  return (
    <tr>
      <td>{position}</td>
      <td> <Flag country={oneFlag(nationality)} /></td>
      <td>
        <Link to={`/driver/:${id}`} className="driverLink">{name} {familyName}</Link>
      </td>
      <td>{team}</td>
      <td>{points}</td>
    </tr>
  );
};

export default TableDrivers;
