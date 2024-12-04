import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import InfiniteScroll from 'react-infinite-scroll-component';


function Popular() {

    document.title = "Movie Web | Popular " ;

    const navigate = useNavigate();
    const [category,setcategory] = useState("movie");
    const [popular,setpopular] = useState("null");
    const [page,setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetPopular = async()=>{
        try{
         const {data} = await axios.get(`${category}/popular?page=${page}`);
         

            if(data.results.length > 0){
              setpopular((prevState)=>[...prevState, ...data.results]);
              setpage(page + 1);
            }else{
                 sethasMore(false)
            }
            
           
        }catch(error){
         console.log("Error:",error);
        }
      };

      
      const refershHandler = () => {
        if(popular.length === 0){
          GetPopular()
        }else{
           setpage(1)
           setpopular([])
           GetPopular();
        }
          

   }
  
     useEffect(()=>{
      refershHandler();
      },[category]); 

  return popular.length > 0 ? (
    <div className='w-screen h-screen overflow-y-auto'>
        <div className='w-full px-[5%] flex items-center'>
       
         <h1 className='text-2xl text-zinc-400 font-semibold'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line"></i>Popular</h1>    

         <Topnav/> 
         <Dropdown title="Category" options={["tv","movie"]} func={(e)=>setcategory(e.target.value)}/>
         
        </div>

        <InfiniteScroll
            dataLength={popular.length}
            next={GetPopular()}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
          <Cards data={popular} title={category}/>
        </InfiniteScroll>
       

    </div>
  ):(
      <Loading/>
    );
}

export default Popular
