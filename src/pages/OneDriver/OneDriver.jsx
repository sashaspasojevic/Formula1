import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "../../services/PostContext";
import { useParams } from "react-router-dom";
import "./OneDriver.scss";
import Loading from "../Loading/Loading";
import Flag from "react-flagkit";
import link_arrow from '../../assets/link_arrow2.png';
import DriverRaces from "./DriverRaces";

const OneDriver = () => {
  const { id } = useParams();
  const { setIsLoading, selectedYear, isLoading, oneFlag } =
    useContext(PostContext);
  const [driverData, setDriverData] = useState(null);
  const [teamData, setTeamData] = useState(null)
  const [imageUrl, setImageUrl] = useState("");

  const getDriver = useCallback(() => {
    const formattedId = id.startsWith(":") ? id.slice(1) : id;
    return axios.get(
      `https://ergast.com/api/f1/${selectedYear}/drivers/${formattedId}/driverStandings.json`
    );
  }, [id, selectedYear]);

  useEffect(() => {
    setIsLoading(true);
    getDriver()
      .then((res) => {
        setDriverData(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
            .Driver
        );    
        setTeamData(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0])
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setIsLoading(false);
      });
  }, [setIsLoading, getDriver]);

  const { givenName, familyName, nationality, url, dateOfBirth } = driverData || {};

  const {name} = teamData || {}

  
let birthday = "";
if (dateOfBirth) {
  birthday = `${dateOfBirth.slice(8, 10)}.${dateOfBirth.slice(5, 7)}.${dateOfBirth.slice(0, 4)}`;
}
  const fullName = `${givenName} ${familyName}`;

  useEffect(() => {
    async function fetchImageInfo(title) {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&origin=*`
      );
      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      return page.pageimage ? page.pageimage : null;
    }

    async function fetchImageURL(imageTitle) {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=File:${imageTitle}&prop=imageinfo&iiprop=url&format=json&origin=*`
      );
      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      return page.imageinfo ? page.imageinfo[0].url : null;
    }

    async function addImage(title) {
      const imageTitle = await fetchImageInfo(title);
      if (imageTitle) {
        const url = await fetchImageURL(imageTitle);
        setImageUrl(url);
      }
    }

    if (fullName) {
      addImage(fullName);
    }
  }, [fullName]);

 return (
  <div className='oneDriver'>
    {isLoading ? (
      <Loading />
    ) : (
      driverData ? (
        <>
          <div className='oneDriver__info'>
            <div>
              <div className='oneDriver__info-profile'>
                <div className='oneDriver__info-img'>
                  {imageUrl && <img src={imageUrl} alt={fullName} />}
                </div>
                <div className='oneDriver__info-text'>
                  <div className='oneDriver__info-flag'>
                    <Flag country={oneFlag(nationality)} className='flag' />
                  </div>
                  <p>{givenName} </p>
                  <p> {familyName}</p>
                </div>
              </div>
              <table className="oneDriver__info-table">
                <tbody>
                  <tr>
                    <td>Country:</td>
                    <td>{nationality}</td>
                  </tr>
                  <tr>
                    <td>Team:</td>
                    <td>{name}</td>
                  </tr>
                   <tr>
                    <td>Date of birthday:</td>
                    <td>{birthday}</td>
                  </tr>
                  <tr>
                    <td>Biography:</td>
                    <td><a href={url} target="_blank" ><img src={link_arrow} alt='link arrow' className="table_link"/></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='oneDriver__table'>
              <DriverRaces id={id} selectedYear={selectedYear} oneFlag={oneFlag}/>
            </div>
          </div>
        </>
      ) : (
        <p>No driver data available.</p>
      )
    )}
  </div>
);

};

export default OneDriver;
