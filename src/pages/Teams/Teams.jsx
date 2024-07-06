import "./Teams.scss";

import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "../../services/PostContext";
import Loading from "../Loading/Loading";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableHeading from "../../components/TableHeading/TableHeading";
import TableTeams from "../../components/TableTeams/TableTeams";

const Teams = () => {
  const { selectedYear, isLoading, setIsLoading } = useContext(PostContext);

  const [allTeams, setAllTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  const getTeams = useCallback(() => {
    return axios.get(
      `http://ergast.com/api/f1/${selectedYear}/constructorStandings.json`
    );
  }, [selectedYear]);

  useEffect(() => {
    setIsLoading(true);
    getTeams().then((res) => {
      try {
        const teams =
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setAllTeams(teams);
        setFilteredTeams(teams);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  }, [getTeams, setIsLoading]);

  const handleSearchTeams = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTeam = allTeams.filter((team) => {
      return team.Constructor.name.toLowerCase().includes(query);
    });

    setFilteredTeams(filteredTeam);
  };

  return (
    <div className='teams'>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          <SearchBar
            setFilteredData={handleSearchTeams}
            placeholderValue='Search teams by name...'
          />
          <div>
            <TableHeading titleH2='Constructors Championship' />
            <table>
              <thead>
                <tr>
                  <th
                    colSpan={5}
                  >{`Constructors Championship Standings -${selectedYear}`}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team) => {
                  return <TableTeams key={team.position} team={team} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
