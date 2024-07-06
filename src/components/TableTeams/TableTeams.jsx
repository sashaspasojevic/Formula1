import { useContext } from "react";
import Flag from "react-flagkit";
import { PostContext } from "../../services/PostContext";
import link_arrow from "../../assets/link_arrow2.png";
import { Link } from "react-router-dom";

const TableTeams = ({ team }) => {
  const { oneFlag } = useContext(PostContext);

  const { position, Constructor, points } = team;
  const { url, constructorId : id, name, nationality } = Constructor;

  return (
    <tr className='teamRow'>
      <td>{position}</td>
      <td>
        <Flag country={oneFlag(nationality)} />
      </td>
      <td><Link to={`/team/:${id}`} className="teamLink">{name}</Link></td>
      <td>
        <a href={url} target='_blank' className='teamRow__link'>
          About
          <img src={link_arrow} alt={`link arrow`} />
        </a>
      </td>
      <td>{points}</td>
    </tr>
  );
};

export default TableTeams;
