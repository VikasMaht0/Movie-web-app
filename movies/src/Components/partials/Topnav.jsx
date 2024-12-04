import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../../public/noimage.jpg"

function Topnav() {

     const [query ,setquery] = useState("");
     const [searches , setsearches] = useState([]);
    
     const getserches = async()=>{
      try{
       const {data} = await axios.get(`/search/multi?query=${query}`);
       
       setsearches(data.results)
      }catch(error){
       console.log("Error:",error);
      }
};

      useEffect(()=>{
       getserches();
         },[query])

  return (
    <div className='w-[50%] h-[10vh] relative flex justify-start items-center ml-[15%]'>
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
       onChange={(e)=>setquery(e.target.value)}
      value={query} 
      className='text-zinc-200 w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent' type="text" placeholder='search anything'/>
      {query.length > 0 && (<i onClick={()=>setquery("")} className="text-3xl text-zinc-400 ri-close-fill"></i>)}

      
      <div className='z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded'>

        {searches.map((s,i) =>{
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300 p-10  w-[100%] flex justify-start items-center border-b-2 border-zinc-100'>

            <img className='w-10vh h-10vh object-cover rounded mr-5 shadow-lg' 
            src= { s.backdrop_path || s.profile_path ?`https://image.tmdb.org/t/p/original/${
                  s.backdrop_path || s.profile_path
              }`: noimage
            } 
              alt="" />

            <span>{s.name || 
                     s.title || 
                     s.original_name || 
                     s.original_title}
            </span>
            </Link>
        })}
        
    
       
      </div>

    </div>
  )
}

export default Topnav
