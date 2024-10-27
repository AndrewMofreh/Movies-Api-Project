import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home/Home';

import Movies from './Components/Movies/Movies';
import Navbar from './Components/Navbar/Navbar';

import'../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Details from './Components/Home/Movie details/movieDetails';
import Moviedetails from './Components/Home/Movie details/movieDetails';
import PersonDetails from './Components/Home/person details/PersonDetails';




function App() {
  let navigate =useNavigate()
  let[userData, setUserData]=useState(null)


function getUserData(){
  let encodeData = localStorage.getItem("token")
  let decodeData = jwtDecode(encodeData)
  // console.log(decodeData)
  setUserData(decodeData)
}


useEffect(()=>{if (localStorage.getItem("token")) // eluseeffect dy dorha anha kol ma elpage t refresh aw tktb path mo5talef f elterminal b3d el login myrga3aksh ll login page tany
                                                  // b3d el login el userdata ally hya bta5od el decoded token mn el local storage btrg3 null fa ay path written by hand hyrg3na ll login
                                                  //fa 3mlna el use effect dy b7es an ay refresh y7sal elbrowser yshof feh token f ellocal storage lw tmam yndh 3la function get userdata 
                                                  //tany ally hya bt assign el decoded data f el userdata
{getUserData()}
}
,[]);


  function logout(){
setUserData(null)
localStorage.removeItem("token")
navigate("/Login")

  }

  function ProtectedRout(props){  //dy component 3shan bd2a b capital letter w dy component 3shan t7my elrout
                                  // el function dy marbota bel useefect ally fo2
  if(localStorage.getItem("token") == null){
    return <Navigate to="/login" />;
  }
  else{
    console.log(props)
    return props.children}

  }

  
  return (
    <>
    <Navbar userData={userData} logout={logout}/>
    <div className='container'>
          <Routes>
            <Route path='' element={<ProtectedRout>   <Home/>   </ProtectedRout>}> </Route>
            
            <Route path='home' element={<ProtectedRout>  <Home/>  </ProtectedRout>}> </Route>  {/*<Route path='home' element={<Home/>}></Route>  dh shakl el rout abl ma nrkblha el protected rout*/}

             <Route path='/home/movieDetails/:id' element={<Moviedetails/>}></Route> {/*el Route btshta8al my el Link el 2 mn library el react router dom, el Route bt7dd el path ally hytktb fo2 w bt render elproject 3la el Element
                                                                         f nfs elw2t el Link bt navigate el project automatic mn 8er refresh ll to=""
                                                                          ally bdorha btnady 3la el Route yrender ll targeted Element
                                                                          el "path" w el "to" lazm yb2a gowahom nfs el7aga */}

            <Route path='/home/PersonDetails/:id' element={<PersonDetails/>}></Route>
            <Route path='movies' 
            element={
                <ProtectedRout>
                  <Movies/>
                </ProtectedRout>
              }></Route>


            <Route path='register' element={<Register/>}></Route>
            <Route path='login' element={<Login getUserData={getUserData}/>}></Route>

            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
  </div>
</>
  );
}

export default App;
