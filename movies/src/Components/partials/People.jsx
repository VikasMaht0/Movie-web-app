import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import InfiniteScroll from 'react-infinite-scroll-component';

function People() {

    document.title = "Movie Web | people Shows " ;

    const navigate = useNavigate();
    const [category,setcategory] = useState("popular");
    const [people,setpeople] = useState("null");
    const [page,setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    const GetPeople = async()=>{
        try{
         const {data} = await axios.get(`/person/${category}?page=${page}`);
         
  
            if(data.results.length > 0){
              setpeople((prevState)=>[...prevState, ...data.results]);
              setpage(page + 1);
            }else{
                 sethasMore(false)
            }
            
           
        }catch(error){
         console.log("Error:",error);
        }
      };
  
      
      const refershHandler = () => {
        if(people.length === 0){
          GetPeople()
        }else{
           setpage(1)
           setpeople([])
           GetPeople();
        }
          
  
   }
  
     useEffect(()=>{
      refershHandler();
      },[category]);


  return  people.length > 0 ? (
    <div className='w-screen h-screen overflow-y-auto'>
        <div className='w-full px-[5%] flex items-center'>
       
         <h1 className='text-2xl text-zinc-400 font-semibold'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line"></i>People</h1>    

         <Topnav/> 
         
         
        </div>

        <InfiniteScroll
            dataLength={people.length}
            next={GetPeople()}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
          <Cards data={people} title="person"/>
        </InfiniteScroll>
       

    </div>
  ):(
      <Loading/>
    );
}

export default People
