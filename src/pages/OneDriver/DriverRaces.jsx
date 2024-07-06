import "./DriverRaces.scss";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Flag from "react-flagkit";

const DriverRaces = ({ selectedYear, id, oneFlag }) => {
  const [races, setRaces] = useState([]);

  const getRaces = useCallback(() => {
    const formattedId = id.startsWith(":") ? id.slice(1) : id;

    return axios.get(
      `https://ergast.com/api/f1/${selectedYear}/drivers/${formattedId}/results.json`
    );
  }, [id, selectedYear]);

  useEffect(() => {
    getRaces()
      .then((res) => {
        setRaces(res.data.MRData.RaceTable.Races);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
      });
  }, [getRaces]);

  return (
    <div className='racesTable'>
      <h3>Formula 1 {selectedYear} results</h3>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th colSpan={2}>Grand Prix</th>
            <th>Team</th>
            <th>Gnd</th>
            <th>Races</th>
          </tr>
        </thead>
        <tbody>
          {races.map((item) => {
            const position = item.Results[0].position;

            const getPositionClass = (position) => {
              if (position === "1") return "position-1";
              if (position === "2") return "position-2";
              if (position === "3") return "position-3";
              if (position >= 4 && position <= 5) return "position-4-5";
              if (position >= 6 && position <= 10) return "position-6-10";
              if (position > 10) return "position-10-plus";
              return "";
            };

            return (
              <tr key={item.round}>
                <td>{item.round}</td>
                <td>
                  {<Flag country={oneFlag(item.Circuit.Location.country)} />}
                </td>
                <td>{item.raceName}</td>
                <td>{item.Results[0].Constructor.name}</td>
                <td>{item.Results[0].grid}</td>
                 <td className={getPositionClass(position)}>{position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DriverRaces;
