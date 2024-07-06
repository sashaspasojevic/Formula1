import "./Home.scss";

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
// import SearchBar from "../../components/SearchBar/SearchBar";


const Home = () => {



  return (
    <section className='home'>
      <div className='nav'>
        <Navbar />
      </div>
      <div className='content'>
        {/* <SearchBar /> */}
        <Outlet />
      </div>
    </section>
  );


};

export default Home;
