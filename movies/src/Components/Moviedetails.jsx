import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

function Moviedetails() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()
  const {info} = useSelector((state) => state.movie);
  // console.log(info)


  useEffect(()=>{
       dispatch(asyncloadmovie(id))
       return () => {
           dispatch(removemovie());
       }
  },[])


  return info ? (
    <div style={{
           background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
               info.detail.backdrop_path 
           })`,
           backgroundPosition:"top 10%",
           backgroundSize:"cover",
           backgroundRepeat:"no-repeat",
           }} className='w-screen h-screen px-[10%]'>


        {/* Part 1 navigation */}

      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl'>

      <Link 
         onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mx-3 ri-arrow-left-line">

         </Link>
         <a target='_blank' href={info.detail.homepage}>
         <i class="ri-external-link-fill"></i>
         </a>
         <a target='_blank' href="">
            <i class="ri-earth-fill"></i>
         </a>
         
         <a target='_blank' href="">imdb</a>
      </nav>

       {/* Part  Poster and Details */}

       <div className='w-full flex'>

       <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' 
           src={`https://image.tmdb.org/t/p/original/${
                 info.detail.poster_path || info.detail.backdrop_path 
              }`} alt="" />

       </div>
     
       <div>
        
      {/* Part 2 Available on platform */}
        <div className='w-[80%] '>
          {info.watchproviders && info.watchproviders.flatrate && 
               info.watchproviders.flatrate.map((w) => 
          (<img className='w-[5vh] h-[5vh] object-cover rounded-md'
            src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
            alt=''
            />
         ))}
             
           {/* MOvie informations */}
            <div className='content mt-6'>
              <h1 className='text-5xl font-black text-white'>{info.detail.name 
                  || info.detail.title 
                    || info.detail.original_name 
                      || info.detail.original_title}

                      <small className='text-2xl font-bold text-zinc-200'>
                        ({info.detail.release_date.split("-")[0]})</small>
              </h1>

              {info.detail.vote_average &&  ( <div className='absolute right-[-10%] bottom-[25%] rounded-full bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center text-xl font-semibold'>{(info.detail.vote_average * 10).toFixed()}<sup>%</sup></div>)}

            </div>



           {/* part 3 avilavle on platforms */}
           {info.watchproviders && info.watchproviders.rent && 
               info.watchproviders.rent.map((w) => 
          (<img className='w-[5vh] h-[5vh] object-cover rounded-md'
            src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
            alt=''
            />
         ))}

            {info.watchproviders && info.watchproviders.buy && 
               info.watchproviders.buy.map((w) => 
          (<img className='w-[5vh] h-[5vh] object-cover rounded-md'
            src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
            alt=''
            />
         ))}  
        </div>
        </div>
       


      
    </div>
  ) : ( <Loading/>
         );

}

export default Moviedetails
