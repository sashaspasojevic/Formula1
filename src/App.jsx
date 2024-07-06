import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Drivers from "./pages/Drivers/Drivers";
import Teams from "./pages/Teams/Teams";
import Races from "./pages/Races/Races";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { PostProvider } from "./services/PostContext";
import OneDriver from "./pages/OneDriver/OneDriver";
import OneTableTeam from "./components/TableTeams/OneTableTeam";
import OneRaceTable from "./pages/Races/OneRaceTable";



const App = () => {
  
  return (
<PostProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Navigate to="/drivers" />} />
          <Route path='/' element={<Home />}>
            <Route path='/drivers' element={<Drivers />} />
            <Route path="driver/:id" element={<OneDriver />} />
            <Route path='/teams' element={<Teams />} />
            <Route path="/team/:id" element={<OneTableTeam/>}/>
            <Route path='/races' element={<Races />} />
            <Route path='/races/:id' element={<OneRaceTable/>} />
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
</PostProvider>
  );
};

export default App;
