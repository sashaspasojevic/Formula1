import { useContext } from "react";
import "./Drivers.scss";

import Loading from "../Loading/Loading";
import TableDrivers from "../../components/TableDrivers/TableDrivers";
import { PostContext } from "../../services/PostContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableHeading from "../../components/TableHeading/TableHeading";

const Drivers = () => {
  const {
    isLoading,
    selectedYear,
    filteredDrivers,
    allDrivers,
    setFilteredDrivers,
  } = useContext(PostContext);

  const handleSearchDrivers = (e) => {
    const query = e.target.value.toLowerCase();
    const filterDrivers = allDrivers.filter((driver) => {
      return driver.Driver.givenName.toLowerCase().includes(query);
    });

    setFilteredDrivers(filterDrivers);
  };

  return (
    <div className='drivers'>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <SearchBar
            setFilteredData={handleSearchDrivers}
            placeholderValue='Search drivers by name...'
          />
          <div>
            <TableHeading titleH2='Drivers Championship' />
            <table>
              <thead>
                <tr>
                  <th
                    colSpan={5}
                  >{`Drivers Championship Standings -${selectedYear}`}</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <TableDrivers key={driver.position} driver={driver} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Drivers;
