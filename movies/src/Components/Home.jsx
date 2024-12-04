import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axios';
import Header from './partials/Header';
import Horizontalcards from './partials/Horizontalcards';
import Loading from './Loading';
import Dropdown from './partials/Dropdown';



function Home() {

    document.title = "Movie web | Homepage";
    const [wallpaper , setwallpaper] = useState(null);
    const [trending , settrending] = useState(null);
    const [category,setcategory] =useState("all");

    // calling random movie images
    const GetHeaderWallpaper = async()=>{
      try{
       const {data} = await axios.get(`/trending/all/day`);
          let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
            setwallpaper(randomdata);
      }catch(error){
       console.log("Error:",error);
      }
};

const GetTrending = async()=>{
  try{
   const {data} = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
  }catch(error){
   console.log("Error:",error);
  }
};

useEffect(()=>{
 !wallpaper && GetHeaderWallpaper();
 GetTrending();
},[category]);

console.log (trending)

  return wallpaper && trending ? (
    <>
     <Sidenav/>
     <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
      <Topnav/>
      <Header data={wallpaper}/>

      <div className=' flex justify-between p-5'>        
       <h1 className='text-3xl text-zinc-400 font-semibold '>Trending</h1>
          
       <Dropdown title="Filter"  options={['tv', 'movie', 'all']} func={(e)=>setcategory(e.target.value)}/>


        </div>
      <Horizontalcards data={trending} />
      </div>
     </>
  ):(
  <Loading/>
  );
  
}

export default Home
