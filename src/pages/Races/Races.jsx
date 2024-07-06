import "./Races.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "../../services/PostContext";
import axios from "axios";
import Loading from "../Loading/Loading";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableHeading from "../../components/TableHeading/TableHeading";
import TableRaces from "./TableRaces";

const Races = () => {
  const { selectedYear, isLoading, setIsLoading } = useContext(PostContext);
  const [allRaces, setAllRaces] = useState([]);
  const [filteredRaces, setFilteredRaces] = useState([]);

  const getRaces = useCallback(() => {
    return axios.get(`http://ergast.com/api/f1/${selectedYear}/results/1.json`);
  }, [selectedYear]);

  useEffect(() => {
    setIsLoading(true);
    getRaces().then((res) => {
      try {
        const racesAll = res.data.MRData.RaceTable.Races;
        setAllRaces(racesAll);
        setFilteredRaces(racesAll);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    });
  }, [setIsLoading, getRaces]);

  const handleSearchRaces = (e) => {
    const query = e.target.value.toLowerCase();
    const filterRace = allRaces.filter((race) => {
      return race.raceName.toLowerCase().includes(query);
    });

    setFilteredRaces(filterRace);
  };

  return (
    <div className='races'>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <SearchBar
            setFilteredData={handleSearchRaces}
            placeholderValue='Search races by name...'
          />
          <div>
            <TableHeading titleH2='Race Calendar' />
            <table>
              <thead>
                <tr>
                  <th colSpan={7}>{`Race Calendar for ${selectedYear}`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Round</td>
                  <td colSpan={2}>Grand Prix</td>
                  <td className='circuit'>Circuit</td>
                  <td>Date</td>
                  <td colSpan={2}>Winner</td>
                </tr>
                {filteredRaces.map((race) => {
                  return <TableRaces key={race.round} race={race} />;
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Races;
