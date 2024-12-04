import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import InfiniteScroll from 'react-infinite-scroll-component';

function Tvshows() {

    document.title = "Movie Web | Tv Shows " ;

    const navigate = useNavigate();
    const [category,setcategory] = useState("airing_today");
    const [tv,settv] = useState("null");
    const [page,setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    const GetTv = async()=>{
        try{
         const {data} = await axios.get(`/tv/${category}?page=${page}`);
         
  
            if(data.results.length > 0){
              settv((prevState)=>[...prevState, ...data.results]);
              setpage(page + 1);
            }else{
                 sethasMore(false)
            }
            
           
        }catch(error){
         console.log("Error:",error);
        }
      };
  
      
      const refershHandler = () => {
        if(tv.length === 0){
          Gettv()
        }else{
           setpage(1)
           settv([])
           GetTv();
        }
          
  
   }
  
     useEffect(()=>{
      refershHandler();
      },[category]);

  return  tv.length > 0 ? (
    <div className='w-screen h-screen overflow-y-auto'>
        <div className='w-full px-[5%] flex items-center'>
       
         <h1 className='text-2xl text-zinc-400 font-semibold'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line"></i>Tv Shows <small className="ml-2 text-sm text-zinc-600">({category})</small></h1>    

         <Topnav/> 
         <Dropdown title="Category" options={["on_th_air","popular","top_rated","now_playing","airing_today"]} func={(e)=>setcategory(e.target.value)}/>
         
        </div>

        <InfiniteScroll
            dataLength={tv.length}
            next={GetTv()}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
          <Cards data={tv} title="tv"/>
        </InfiniteScroll>
       

    </div>
  ):(
      <Loading/>
    );
}

export default Tvshows
