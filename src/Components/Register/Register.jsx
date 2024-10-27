import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Login from '../Login/Login';
import Login from './../Login/Login';


export default function Register() {
  let[error,setError]=useState('');
  let navigate = useNavigate();  // let[jsonDataInfo, setJsonDataInfo]= useState('');
  let[validateMessage, setValidateMessage]=useState('');
  let[loading, setLoading]=useState(false);
  let [dataInfo, setDataInfo]=useState({userName:"",dateOfBirth:"", email:"", password:"", rePassword:""});
function getData(e){
  setDataInfo({...dataInfo ,[e.target.name]: e.target.value,});
}
function validateRegisterForm(){
  let scheme = Joi.object({
  userName:Joi.string()
  .alphanum()
  .min(8)
  .max(30)
  .required(),
  dateOfBirth: Joi.date().iso(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  rePassword: Joi.ref('password'),
  })
    return scheme.validate(dataInfo,{abortEarly:false})
  }
async function handleSubmit(e){
  setLoading(true)
  e.preventDefault()
    let validate= validateRegisterForm();
    setValidateMessage(validate?.error?.details);
    if(validate?.error?.details){
      console.log(validate?.error?.details);
      setLoading(false)
    }
    else{
      axios.post('http://hawas.runasp.net/api/v1/Register', dataInfo )
          .then((res)=>{console.log("done",res);
            navigate("/login");
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

{validateMessage.error? validateMessage.error?.details?.map(details=><h3 className='alert alert-danger h6'>{details.message}</h3>):''}
<form  className='mx-auto' onSubmit={handleSubmit}>
        <h1 className='text-center mt-5'>Register now</h1>
{/* {validateMessage.error? (<h3 className='alert alert-danger'>{validateMessage.error.details.map(detail => detail.message)}</h3>) : ''} */}
<label className='label'>User name</label>
<input name='userName' id='userName' type='text' className='form-control my-3' onChange={getData}></input>
<label className='label'>Date Of Birth</label>
<input name='dateOfBirth' id='dateOfBirth' type='text' className='form-control my-3' onChange={getData}></input>
<label className='label'>E-mail</label>
<input name='email' id='email' type='email' className='form-control my-3'onChange={getData}></input>

<label className='label'>Password</label>
<input name='password' id='Password' type='password' className='form-control my-3'onChange={getData}></input>
<label className='label'>Re Password</label>
<input name='rePassword' id='rePassword' type='password' className='form-control my-3'onChange={getData}></input>
<button className='btn btn-warning' type='submit'>{loading === true ? (<i className='fas fa-spin fa-spinner'></i>):(<div>Register</div>)} </button>
</form>
</div>
    </>
  )
    }
