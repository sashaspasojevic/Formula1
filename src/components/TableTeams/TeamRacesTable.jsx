import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Flag from "react-flagkit";
import { v4 as uuidv4 } from 'uuid';
import './TeamRacesTable.scss'

export const TeamRacesTable = ({ id, selectedYear, oneFlag }) => {
  const [teamRaces, setTeamRaces] = useState([]);
  const [teamDrivers, setTeamDrivers] = useState([]);

  const getTeamRaces = useCallback(() => {
    return axios.get(
      `https://ergast.com/api/f1/${selectedYear}/constructors/${id}/results.json`
    );
  }, [id, selectedYear]);

  useEffect(() => {
    getTeamRaces().then((res) => {
      const races = res.data.MRData.RaceTable.Races;
      setTeamRaces(races);
     

      if (races.length > 0) {
        setTeamDrivers(races[0].Results);
      } else {
        setTeamDrivers([]); 
      }
    }).catch((error) => {
      console.error("Error fetching driver data:", error);
    });
  }, [getTeamRaces]);

  return (
    <div className='teamTable'>
      <h3>Formula 1 {selectedYear} results</h3>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th colSpan={2}>Grand Prix</th>
            <th>Position: {teamDrivers[0]?.Driver?.familyName}</th>
            <th>Position: {teamDrivers[1]?.Driver?.familyName}</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teamRaces.map((item) => {
            const position1 = item.Results[0].position;
            const position2 = item.Results[1].position;

            const getPositionClassTeam = (position) => {
              if (position === "1") return "position1";
              if (position === "2") return "position2";
              if (position === "3") return "position3";
              if (position >= 4 && position <= 5) return "position4-5";
              if (position >= 6 && position <= 10) return "position6-10";
              if (position > 10) return "position10-plus";
              return "";
            };

            return (
              <tr key={id = uuidv4()}>
                <td>{item.round}</td>
                <td>
                  {<Flag country={oneFlag(item.Circuit.Location.country)} />}
                </td>
                <td>{item.raceName}</td>
                <td className={getPositionClassTeam(position1)}>{position1}</td>
                <td className={getPositionClassTeam(position2)}>{position2}</td>
                <td>{Number(item.Results[0].points) + Number(item.Results[1].points)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
