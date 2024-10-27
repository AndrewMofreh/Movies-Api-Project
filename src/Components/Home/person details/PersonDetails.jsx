import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pathimg from './../../../Constant/pathimg';

export default function PersonDetails() {

    

  let[personData, setPersonData] = useState({})
  let {id}= useParams()

  useEffect(()=>{
  getData("person", setPersonData,id);
  },[])
    
 async function getData(category,setData,id){
   await axios.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=a54c81b3e96fba32fbccc2dae379a768`)
    .then(({data})=>{console.log("done ya basha",data)
        setData(data)
    })
    .catch((err)=>{console.log("there's something wrong",err)})
}




  return (
    <div>
    <div className='container my-5'>
      <div className="row">
        <div className="col-md-3">
    <img src={pathimg(personData.profile_path)} className='w-100' alt="" />
        </div>
        <div className="col-md-3">
          <h1 className='h3'>{personData.name}</h1>
        </div>
        <div>
        <h4>
          {personData.biography}
        </h4>

        </div>
  
      </div>

    </div>
    
    
    </div>
  )
}
