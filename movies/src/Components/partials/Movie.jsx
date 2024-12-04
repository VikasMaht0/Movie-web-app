import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {

  document.title = "Movie Web | Movies " ;

  const navigate = useNavigate();
  const [category,setcategory] = useState("now_playing");
  const [movie,setmovie] = useState("null");
  const [page,setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetMovie = async()=>{
      try{
       const {data} = await axios.get(`/movie/${category}?page=${page}`);
       

          if(data.results.length > 0){
            setmovie((prevState)=>[...prevState, ...data.results]);
            setpage(page + 1);
          }else{
               sethasMore(false)
          }
          
         
      }catch(error){
       console.log("Error:",error);
      }
    };

    
    const refershHandler = () => {
      if(movie.length === 0){
        GetMovie()
      }else{
         setpage(1)
         setmovie([])
         GetMovie();
      }
        

 }

   useEffect(()=>{
    refershHandler();
    },[category]); 

  return movie.length > 0 ? (
    <div className='w-screen h-screen overflow-y-auto'>
        <div className='w-full px-[5%] flex items-center'>
       
         <h1 className='text-2xl text-zinc-400 font-semibold'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line"></i>Movie<small className="ml-2 text-sm text-zinc-600">({category})</small></h1>    

         <Topnav/> 
         <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)}/>
         
        </div>

        <InfiniteScroll
            dataLength={movie.length}
            next={GetMovie()}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
          <Cards data={movie} title="movie"/>
        </InfiniteScroll>
       

    </div>
  ):(
      <Loading/>
    );
}

export default Movie
