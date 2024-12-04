import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ data = [] ,title}) {
  // Ensure that data is an array before using map
  if (!Array.isArray(data)) {
    console.error('Expected an array for data prop, but got:', data);
    return <div>No data available</div>;
  }

  return (
    <div className='flex flex-wrap  w-full h-full px-[5%] '>
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[5%] mb-[5%]' key={i}>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${
                 c.poster_path || c.backdrop_path || c.profile_path
              }`} alt="" />
              <h1 className='text-xl text-zinc-400 mt-3 font-semibold'> 
              {c.name || c.title || c.original_name || c.original_title}
              </h1>
              
              {c.vote_average &&  ( <div className='absolute right-[-10%] bottom-[25%] rounded-full bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center text-xl font-semibold'>{(c.vote_average * 10).toFixed()}<sup>%</sup></div>)}

            
      
        </Link>
      ))}
    </div>
  );
}

export default Cards;
