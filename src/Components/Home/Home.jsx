import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardMovies from './CardMovies';
import CardPerson from './CardPerson';
import "./Home.css"  // lazm n7ot el ./ 3shan yfham enna bntklm 3la nfs elfolder 
import Spinner from '../spinner/Spinner';
                     // lkn lw m3mlmlnhash hyfham enna bnady 3la 7aga mn el node module


export default function Home() {      //msh shart en elfile yb2a esmo home brdo momkn yb2a esmo index 3ady bm3na el start point llfolder
                                      // bs lma agy a3ml import b3ml import b esm elcomponent
  let[movies,setMovies]=useState([])
  let[person,setPerson]=useState([])
  let[status,setStatus]=useState("Done") // dy 3amlenha 3shan lma nnady 3la el getdata l8ayet ma tegy
                                        // n5aly el status b loading w e7na 3amlen itenary operator t7t
                                        // en lma el status b loading nady 3la el spinner w lw b done e3rd 
                                        //eldata w lw b error e3rd error message




  
useEffect(() => { 
  
 getdata("movie",setMovies)
 getdata("person",setPerson)
}, [])






async function getdata(category,setdata){
  setStatus("loading")
   await axios.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=a54c81b3e96fba32fbccc2dae379a768`)
    .then(({data:{results}})=>{console.log("done",results)
      setdata(results.slice(0,10));
      console.log(movies,"second done");
      setStatus("done")
    })
    .catch((err)=>{console.log(err,"not done")
      setStatus("Error")
    })
 }



  return (
    <>
    {status=="done"?

    <>
        <div className='row g-4 my-5'>
        <div className="col-md-4 mt-5">
        <div className="brdr brdr-t"></div>
          <h1 className='h3 my-5'>
             Trending <br />
              Movies <br />
              To watch right now
          </h1>
    <div className="brdr brdr-b"></div>
        </div>
        {movies.map((movie)=>(
          <CardMovies key={movie.id} movie={movie}/>
        ))}
  </div>


  <hr />


  <div className='row g-4 my-5'>
        <div className="col-md-4 mt-5">
<div className="brdr brdr-t"></div>
  <h1 className='h3 my-5'>
    Trending <br />
    people <br />
    To watch right now
  </h1>
  <div className="brdr brdr-b"></div>
        </div>
        {person.map((person)=>(
            <CardPerson key={person.id} person={person}/>
        ))}
  </div>

    
    </>:status=="loading"?<Spinner/>:<h1>Contact your admin there's an error</h1>
    
    
    }


  </>


  )
}
