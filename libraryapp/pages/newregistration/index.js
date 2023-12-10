import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import CircularProgress from "@mui/material/CircularProgress";


function NewRegistration() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [loader,setLoader] = useState(false)

  const handlechangeName = (event) => {
    setUsername(event.target.value)
  }

  const handlechangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value)
  }
  const handlechangePhone = (event) => {
    setPhone(event.target.value)
  }

  const handleSubmit = () => {
    setLoader(true)
    axios.post('http://localhost:3001/api/user/newregistration', { username, email, address, phone })
      .then((respost) => {
        console.log(respost)
        setUsername('')
        setEmail('')
        setAddress('')
        setPhone('')
        setLoader(false)
      })
      .catch((reserr) => {

      })
  }

  return (
    <div className='container mx-auto'>

      <div className='flex justify-center items-center p-2 font-semibold  text-4xl   '>New Registration
      </div>
      <div className="container mx-auto p-8 h-screen flex justify-center items-center">
        <div className=" w-[700px] bg-slate-300 rounded-lg p-[10px] pb-[10px]!important mb-8 border-b-2  border-white mt-6">

          <div className='text-white p-8' >

            <div className='flex justify-center items-center  font-semibold  pb-3 pt-3 text-3xl text-[#e28743] '>Enter the Details
            </div>

            <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Name <TextField value={username} onChange={handlechangeName} sx={{ width: '80%', marginLeft: '53px' }} id="outlined-basic" variant="outlined" /></div>
            <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Email <TextField value={email} onChange={handlechangeEmail} sx={{ width: '80%', marginLeft: '57px' }} id="outlined-basic" variant="outlined" /></div>
            <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Address <TextField value={address} onChange={handleChangeAddress} sx={{ width: '80%', marginLeft: '34px' }} id="outlined-multiline-flexible" multiline maxRows={4}
            /></div>
            <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Phone <TextField value={phone} onChange={handlechangePhone} sx={{ width: '80%', marginLeft: '51px' }} id="outlined-basic" variant="outlined" /></div>
            <div className="items-center flex justify-end  ">

              <button
                type="button"
                onClick={() => handleSubmit()}

                class=" mt-8 text-[#050708] bg-white   focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-6 mb-2 ml-[2px]"
              >
                  <span className="mr-4">
                                    {loader ? (
                                        <CircularProgress size="22px"  />
                                    ) : (
                                    <></>
                                    )}
                                </span>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRegistration