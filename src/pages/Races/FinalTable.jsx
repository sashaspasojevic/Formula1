import { useContext } from "react";
import Flag from "react-flagkit"
import { PostContext } from "../../services/PostContext";
import  './OneRaceTable.scss';

const FinalTable = ({item}) => {
         const { oneFlag } = useContext(PostContext);
       
            const getPointsClass = (points) => {
              if (points >= "20") return "points-1";
              if (points >=  "15") return "points-2";
              if (points >= "10") return "points-3";
              if (points >= 5 && points <= 9) return "points-4-5";
              if (points > 0 && points <= 4) return "points-6-10";
              if (points <= 0) return "points-10-plus";
              return "";
            };


  return (
     <tr>
        <td>{item.position}</td>
        <td><Flag country={oneFlag(item.Driver.nationality)}/></td>
        <td>{item.Driver.familyName}</td>
        <td>{item.Constructor.name}</td>
        <td>{item?.Time?.time || `FastestLap:  ${item?.FastestLap?.Time?.time }`}</td>
        <td className={getPointsClass(item.points)}>{item.points}</td>
    </tr>
  )
}

export default FinalTable