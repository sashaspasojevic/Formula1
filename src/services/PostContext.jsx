import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [flags, setFlags] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [isLoading, setIsLoading] = useState(true);
  const [allDrivers, setAllDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const getAllDrivers = useCallback(() => {
    return axios.get(
      `https://ergast.com/api/f1/${selectedYear}/driverStandings.json`
    );
  }, [selectedYear]);

  const getAllFlags = () => {
    return axios.get(
      `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
    );
  };



useEffect(() => {
  setIsLoading(true);

  const fetchDrivers = async (year) => {
    try {
      const res = await axios.get(
        `https://ergast.com/api/f1/${year}/driverStandings.json`
      );
      const standingsList = res.data.MRData.StandingsTable.StandingsLists;
      if (standingsList.length > 0) {
        setAllDrivers(standingsList[0].DriverStandings);
        setFilteredDrivers(standingsList[0].DriverStandings);
        setSelectedYear(year); // Postavi na validnu godinu
      } else if (year > 1950) { // API ima podatke od 1950. godine
        fetchDrivers(year - 1); // Pokušaj sa prethodnom godinom
      } else {
        setAllDrivers([]);
        setFilteredDrivers([]);
      }
    } catch (error) {
      console.error("Error fetching driver standings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDrivers(selectedYear);
}, [selectedYear]);


  useEffect(() => {
    getAllFlags().then((res) => {
      setFlags(res.data);
    });
  }, []);

  const oneFlag = (nationality) => {
    const alternateNationalities = {
      British: "British, UK",
      Dutch: "Dutch, Netherlandic",
      Monegasque: "Monégasque, Monacan",
      "New Zealander": "New Zealand, NZ",
      USA: "United States of America, United States, US, USA",
      UK: "British, UK",
      Korea: "South Korean",
      UAE: "Emirati, Emirian, Emiri",
      Azerbaijan: "Azerbaijan",
    };

    const flag = flags.find((flag) => {
      return (
        nationality === flag.nationality ||
        (alternateNationalities[nationality] &&
          alternateNationalities[nationality].includes(flag.nationality)) ||
        nationality === flag.en_short_name
      );
    });

    return flag ? flag.alpha_2_code : "US";
  };
  

  return (
    <PostContext.Provider
      value={{
        getAllDrivers,
        flags,
        oneFlag,
        setSelectedYear,
        selectedYear,
        isLoading,
        allDrivers,
        filteredDrivers,
        setFilteredDrivers,
        setIsLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
