import { useCallback, useContext, useEffect, useState } from "react";
import './OneTableTeam.scss';
import { useParams } from "react-router-dom";
import { PostContext } from "../../services/PostContext";
import Loading from "../../pages/Loading/Loading";
import axios from "axios";
import WikipediaImage from "./WikipediaImage";
import Flag from "react-flagkit";
import link_arrow from '../../assets/link_arrow.png'
import { TeamRacesTable } from "./TeamRacesTable";

const OneTableTeam = () => {
  const { id } = useParams();
  const { setIsLoading, selectedYear, isLoading, oneFlag } =
    useContext(PostContext);
  const [teamInfo, setTeamInfo] = useState({});


  const getTeamInfo = useCallback(() => {
    const formattedId = id.startsWith(":") ? id.slice(1) : id;
    return axios.get(`https://ergast.com/api/f1/${selectedYear}/constructors/${formattedId}/constructorStandings.json`);
  }, [id, selectedYear]);

  useEffect(() => {
    setIsLoading(true);
    try {
      getTeamInfo().then((res) => {
        setIsLoading(false);
        setTeamInfo(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setIsLoading, getTeamInfo]);

  const { position, points, Constructor } = teamInfo || {};

  const teamId = Constructor?.constructorId;
  const wikipediaURL = Constructor?.url;
  let name = Constructor?.name;
  const nationality = Constructor?.nationality;
 
  return (
    <div className='oneTeam'>
      {isLoading ? (
        <Loading />
      ) : teamInfo ? (
        <>
          <div className='oneTeam__info'>
            <div>
              <div className='oneTeam__info-profile'>
                <div className='oneTeam__info-img'>
                  <WikipediaImage wikipediaURL={wikipediaURL} />
                </div>
                <div className='oneTeam__info-text'>
                  <div className='oneTeam__info-flag'>
                    <Flag country={oneFlag(nationality)} className='flag' />
                  </div>
                  <p>{name} </p>
                </div>
              </div>
              <table className='oneTeam__info-table'>
                <tbody>
                  <tr>
                    <td>Country:</td>
                    <td>{nationality}</td>
                  </tr>
                  <tr>
                    <td>Position:</td>
                    <td>{position}</td>
                  </tr>
                  <tr>
                    <td>Points:</td>
                    <td>{points}</td>
                  </tr>
                  <tr>
                    <td>History:</td>
                    <td>
                      <a href={wikipediaURL} target='_blank' rel='noopener noreferrer'>
                        <img
                          src={link_arrow}
                          alt='link arrow'
                          className='table_link'
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='oneTeam__table'>
             <TeamRacesTable id={teamId}
                selectedYear={selectedYear}
                oneFlag={oneFlag}/>
            </div>
          </div>
        </>
      ) : (
        <p>No driver data available.</p>
      )}
    </div>
  );
};

export default OneTableTeam;
