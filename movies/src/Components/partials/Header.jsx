import React from 'react'
import { Link } from 'react-router-dom'

function Header({data}) {
  return (
    // header background latest movie images
    <div
     style={{
         background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
                  data.backdrop_path || data.profile_path
              })`,
              backgroundPosition:"top 10%",
              backgroundSize:"cover",
              backgroundRepeat:"no-repeat",
    }}
    className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>

     {/* header latest movie information */}
        <h1 className='w-[70%] text-5xl font-black text-white'>
                    {data.name || 
                     data.title || 
                     data.original_name || 
                     data.original_title}
        </h1>
        <p className='w-[70%] mt-3 mb-3 text-white'>{data.overview.slice(0,200)}...
          <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link></p>
        <p className='text-white flex'>
            <i className="text-yellow-500 ri-megaphone-fill"></i>{""}{data.release_date || "No Information"}
            <i className="text-yellow-500 ri-album-fill"></i>{""}{data.media_type}
        </p>
        <Link className='text-white p-4 rounded bg-[#6556cd] font-bold mt-5  '>Watch Trailer
        </Link>
      
    </div>
  )
}

export default Header
