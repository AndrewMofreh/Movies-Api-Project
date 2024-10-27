import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
  return (
  <div className=''>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className='container'>
        <Link className="navbar-brand ms-auto" to="/">Free watch</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.userData&&                                                         // m3naha enk okay loged in
                          <ul className="navbar-nav mx-5 ">
                                <li className="nav-item active">
                                  <Link className="nav-link" to="home">Home</Link>
                                </li>
                                <li className="nav-item">
                                  <Link className="nav-link" to="movies">Movies</Link>
                                </li>
                                <li className="nav-item">
                                  <Link className="nav-link" to="people">People</Link>
                                </li>
                                <li className="nav-item">
                                  <Link className="nav-link" to="tv">TV</Link>
                                </li>
                          </ul>
        }


        <ul className='navbar-nav ms-auto'>
          <ul className='navbar-nav mx-5 align-items-center'>
          <li className="nav-item me-2">
            <i className="fa-brands fa-facebook"></i>
          </li>
        <li className="nav-item me-2">
          <i className="fa-brands fa-instagram"></i>
          </li>
        <li className="nav-item me-2">
          <i className="fa-brands fa-twitter"></i>
          </li>


          </ul>
          {props.userData == null&&    // m3naha enk loged out

          <>
        <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
        <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
          </>
          }

          {props.userData&&
                          <li className="nav-item">
                            <button className="nav-link "  to="logout" onClick={props.logout}>Logout</button>
                            </li>
          }
        
        </ul >
      </div>
  </div>
</nav>
  </div>
  )
}
