import React, {useState, useEffect } from 'react'
import Home from './../Home/Home';
import axios from 'axios';
import Spinner from './../spinner/Spinner';
import CardMovies from './../Home/CardMovies';
import { array } from 'joi';



export default function Movies() {
    let[movies,setMovies]=useState([])
    let[status,setStatus]=useState("Done")

    let num =  Array(10).fill(1).map((num,index)=>index+1) // dy 3obara 3n array fadya 5alenaha 10 amakn w malenaha b num 1
                                                            //b3daha mshena 3la kol mkan w zawdna 3la el index bta3o 1 w 7atenah
                                                            //f elmkan dh b3daha 3mlna map tanya 3la el array t7t w 7atena f kol mkan el index +1 
    console.log(num)



    useEffect(() => { 
  
        getdata()
       }, [])

    async function getdata(number){
        setStatus("loading")
         await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=a54c81b3e96fba32fbccc2dae379a768&include_adult=false&include_video=false&language=en-US&page=${number}`)
          .then(({data:{results}})=>{console.log("done",results)
            setMovies(results);
            setStatus("done")
          })
          .catch((err)=>{console.log(err,"not done")
            setStatus("Error")
          })
       }





       return (
        <>
<nav aria-label="Page navigation example">
  <ul class="pagination container d-flex justify-content-center">

    {num.map((number)=>
    <li class="page-item "><a class="page-link text-dark" href="#" onClick={()=>getdata(number)} >{number}</a></li>
    
    )}
  </ul>
</nav>
        {status==="done"?
    
     
        <div className='row g-4 my-5'>
            {movies.map((movie)=>(
              <CardMovies key={movie.id} movie={movie}/>
            ))}
        </div>
        :status==="loading"?<Spinner/>:<h1>Contact your admin there's an error</h1>
        }

<nav aria-label="Page navigation example">
  <ul class="pagination container d-flex justify-content-center">

    {num.map((number)=>
    <li class="page-item "><a class="page-link text-dark" href="#" onClick={()=>getdata(number)} >{number}</a></li>
    
    )}
  </ul>
</nav>
    
    
      </>
    
    
      )
}
