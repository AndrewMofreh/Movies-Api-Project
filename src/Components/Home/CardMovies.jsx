import React from 'react'
import { Link } from 'react-router-dom';
import pathimg from './../../Constant/pathimg';
export default function CardMovies({movie}) {
  let{poster_path, title}=movie
  return (
    <div className="cards col-md-2">
    <div className="card">
<Link to={`/home/movieDetails/${movie.id}`}>
<img src={pathimg(poster_path)} className='w-100' alt="" />
<h3 className='h6'>{title}</h3>
</Link>
    {/* <p className='overflow-auto'>{overview}</p> */}
  </div>
</div>
  )
}
