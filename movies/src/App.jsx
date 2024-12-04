import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/partials/Popular";
import Movie from "./Components/partials/Movie";
import Tvshows from "./Components/partials/Tvshows";
import People from "./Components/partials/People"; 
import Moviedetails from "./Components/Moviedetails";
import Tvdetails from "./Components/Tvdetails";
import Persondetail from "./Components/Persondetail";

export default function App() {

  return (

    <div className="bg-[#1F1E24] w-screen h-screen flex overflow-hidden">
      
       <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path ="/trending" element={<Trending/>} />
        <Route path ="/popular" element={<Popular/>} />
        <Route path ="/movie" element={<Movie/>}/> 
        <Route path="/movie/details/:id" element={<Moviedetails/>}/>
        <Route path ="/tv" element={<Tvshows/>}/> 
        <Route path="/tv/details/:id" element={<Tvdetails/>}/>
        <Route path ="/person" element={<People/>}/> 
        <Route path="/person/details/:id" element={<Persondetail/>}/>
       </Routes>

    </div>
  )
}