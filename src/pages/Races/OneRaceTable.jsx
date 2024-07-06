import "./OneRaceTable.scss";

import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../services/PostContext";
import Loading from "../Loading/Loading";
import Flag from "react-flagkit";
import link_arrow from "../../assets/link_arrow.png";
import QualifyingTable from "./QualifyingTable";import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import FinalTable from "./FinalTable";

const OneRaceTable = () => {
  const { id } = useParams();
  const { setIsLoading, selectedYear, isLoading, oneFlag } =
    useContext(PostContext);

  const [qualifyingResults, setQualifyingResults] = useState(null);
  const [finalResults, setFinalResults] = useState(null);
  const [finalInfo, setFinalInfo] = useState(null);

  const formattedId = id.startsWith(":") ? id.slice(1) : id;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [qualifyingRes, finalRes] = await Promise.all([
        axios.get(
          `https://ergast.com/api/f1/${selectedYear}/${formattedId}/qualifying.json`
        ),
        axios.get(
          `https://ergast.com/api/f1/${selectedYear}/${formattedId}/results.json`
        ),
      ]);

      setQualifyingResults(qualifyingRes.data.MRData.RaceTable.Races[0].QualifyingResults);
      setFinalResults(finalRes.data.MRData.RaceTable.Races[0].Results);
      setFinalInfo(finalRes.data.MRData.RaceTable.Races[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formattedId, selectedYear, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { Circuit, raceName, date, url } = finalInfo || {};

  const countryRace = Circuit?.Location?.country;
  const locationRace = Circuit?.Location?.locality;

  let dayOfRace = "";
  if (date) {
    dayOfRace = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}.`;
  }

  // console.log(finalResults);

  return (
    <div>
      <div className='oneRace'>
        {isLoading ? (
          <Loading />
        ) : finalInfo ? (
          <>
            <div className='oneRace__info'>
              <div>
                <div className='oneRace__info-profile'>
                  <div className='oneRace__info-text'>
                    <div className='oneRace__info-flag'>
                      <Flag country={oneFlag(countryRace)} className='flag' />
                    </div>
                  </div>
                  <h3>{raceName}</h3>
                </div>
                <table className='oneRace__info-table'>
                  <tbody>
                    <tr>
                      <td>Country:</td>
                      <td>{countryRace}</td>
                    </tr>
                    <tr>
                      <td>Location:</td>
                      <td>{locationRace}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{dayOfRace}</td>
                    </tr>
                    <tr>
                      <td>Full Report:</td>
                      <td>
                        <a href={url} target='_blank'>
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
              <div className='oneRace__table'>
                <table>
                  <thead>
                    <tr className="oneRace__thead1">
                      <th colSpan={5}>Qualifying Results</th>
                    </tr>
                    <tr className="oneRace__thead2">
                      <th>Pos</th>
                      <th colSpan={2}>Driver</th>
                      <th>Team</th>
                      <th>Best Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualifyingResults.map((item) => {
                      return <QualifyingTable key={uuidv4()} item={item}/>
                    })}
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr className="oneRace__thead1">
                      <th colSpan={6}>Race Results</th>
                    </tr>
                    <tr className="oneRace__thead2">
                      <th>Pos</th>
                      <th colSpan={2}>Driver</th>
                      <th>Team</th>
                      <th>Results</th>
                      <th>Points</th>
                    </tr>
                  </thead> <tbody>
                    {finalResults.map((item) => {
                      return <FinalTable key={uuidv4()} item={item}/>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p>No driver data available.</p>
        )}
      </div>

      {/* {qualifyingResults && (
        <div>
          <h2>Qualifying Results</h2>
         
        </div>
      )}
      {finalResults && (
        <div>
          <h2>Final Results</h2>
        
        </div>
      )} */}
    </div>
  );
};

export default OneRaceTable;
