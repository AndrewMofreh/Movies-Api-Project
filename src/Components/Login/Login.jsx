import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';





export default function Login(props) {




  let[error,setError]=useState('');
  let navigate = useNavigate();  
  // let[jsonDataInfo, setJsonDataInfo]= useState('');
  let[validateMessage, setValidateMessage]=useState('');
  let[loading, setLoading]=useState(false);
  let[token,setToken]=useState('')
  let [dataInfo, setDataInfo]=useState({email:"", password:""});
function getData(e){
  setDataInfo({...dataInfo ,[e.target.name]: e.target.value});
}
function validateLoginForm(){
  let scheme = Joi.object({

 
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
    return scheme.validate(dataInfo,{abortEarly:false})
  }
async function handleSubmit(e){
  setLoading(true)
  e.preventDefault()
    let validate= validateLoginForm();
    setValidateMessage(validate?.error?.details);
    if(validate?.error?.details){
      console.log(validate?.error?.details);
      setLoading(false)
    }
    else{
      axios.post('http://hawas.runasp.net/api/v1/Login', dataInfo )
          .then((res)=>{console.log("done",res.data.jwt);
            // setToken(res.data.jwt)
            localStorage.setItem("token",res.data.jwt)
            props.getUserData()
            navigate("/Home");
    }) 
    .catch((err)=>{console.log("not done",err);
    })
    .finally(()=>{
      setLoading(false);
    })
  }}
// let x = JSON.stringify(dataInfo)
          // console.log(x);
          // setJsonDataInfo(x)

    return (
    <>
<div className="">
{error.length>0?<h3 className='alert alert-'>{error}</h3>:''}
{validateMessage?.error? validateMessage?.error?.details.map(details=><h3 className='alert alert-danger h6'>{details.message}</h3>):''}
<form  className='mx-auto' onSubmit={handleSubmit}>
        <h1 className='text-center mt-5'>Login now</h1>
{/* {validateMessage.error? (<h3 className='alert alert-danger'>{validateMessage.error.details.map(detail => detail.message)}</h3>) : ''} */}
<label className='label'>E-mail</label>
<input name='email' id='email' type='email' className='form-control my-3'onChange={getData}></input>

<label className='label'>Password</label>
<input name='password' id='Password' type='password' className='form-control my-3'onChange={getData}></input>
<button className='btn btn-warning' type='submit'>{loading === true ? (<i className='fas fa-spin fa-spinner'></i>):(<div>Login</div>)} </button>
</form>
</div>
    </>
  )
    }
