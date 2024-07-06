import "./SearchBar.scss";
import searchImg from "../../assets/search.png";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../services/PostContext";

const SearchBar = ({ setFilteredData, placeholderValue }) => {
  const { selectedYear, setSelectedYear } = useContext(PostContext);
  const [localSelectedYear, setLocalSelectedYear] = useState(selectedYear);

  useEffect(() => {
    setSelectedYear(localSelectedYear);
  }, [localSelectedYear, setSelectedYear]);

  const getDropList = () => {
    const year = new Date().getFullYear();
    const startYear = 2013;
    let howManyYears = year - startYear + 1;
    return Array.from(new Array(howManyYears), (v, i) => (
      <option key={i} value={year - i}>
        {year - i}
      </option>
    ));
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLocalSelectedYear(value);
    setSelectedYear(value);
  };

  return (
    <div className='searchBar'>
      <div>
        <label htmlFor='option' className="selectYear">Choose year 2013 - 2024</label>
        <select name='choseYear' id='option' value={localSelectedYear} onChange={handleChange}>
          {getDropList()}
        </select>
      </div>
      <div className='searchBar_input'>
        <img
          src={searchImg}
          alt='search image'
          className='searchBar_input-img'
        />
        <input type='text' placeholder={placeholderValue} onChange={setFilteredData} />
      </div>
    </div>
  );
};

export default SearchBar;
