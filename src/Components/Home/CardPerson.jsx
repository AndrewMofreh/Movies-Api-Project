import React from 'react'
import { Link } from 'react-router-dom'
import Details from './Movie details/movieDetails'
import pathimg from './../../Constant/pathimg';
export default function CardPerson({person}) {
  return (
    <div className="cards col-md-2">
    <div className="card">
    <Link to={`/home/PersonDetails/${person.id}`}>
        <img src={pathimg(person.profile_path)} className='w-100' alt="" />
        <h3 className='h6'>{person.name}</h3>
        </Link>
  </div>
</div>
  )
}
