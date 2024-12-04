import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import axios from '../utils/axios';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';


function Trending() {

    document.title = "Movie Web | Trending " 

    const navigate = useNavigate();
    const [category,setcategory] = useState("all");
    const [duration,setduration] = useState("day");
    const [trending,settrending] = useState([]);
    const [page,setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    


    const GetTrending = async()=>{
        try{
         const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`);

            if(data.results.length > 0){
              settrending((prevState)=>[...prevState, ...data.results]);
              setpage(page + 1);
            }else{
                 sethasMore(false)
            }
            // settrending(data.results);
            
           
        }catch(error){
         console.log("Error:",error);
        }
      };

      const refershHandler = () => {
            if(trending.length === 0){
              GetTrending()
            }else{
               setpage(1)
               settrending([])
               GetTrending();
            }
              

      }
      
      useEffect(()=>{
        refershHandler();
      },[category,duration]);  
      

  return trending.length > 0 ? (
    <div className='w-screen h-screen overflow-y-auto'>
        <div className='w-full px-[5%] flex items-center'>
       
         <h1 className='text-2xl text-zinc-400 font-semibold'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line"></i>Trending</h1>    

         <Topnav/> 
         <Dropdown title="Category" options={["movie","tv","all"]} func={(e)=>setcategory(e.target.value)}/>
         <div className='w-[2%]'></div>
         <Dropdown title="Duration" options={["week","day"]} func={(e)=>setduration(e.target.value)}/>
        </div>

        <InfiniteScroll
            dataLength={trending.length}
            next={GetTrending()}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
          <Cards data={trending} title={category}/>
        </InfiniteScroll>




        

    </div>
  ):(
      <Loading/>
    );
}

export default Trending
