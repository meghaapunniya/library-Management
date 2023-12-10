import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router';
import CircularProgress from "@mui/material/CircularProgress";


function borrowBooks() {
    const [bookID, setBookID] = useState()
    const [memberid, setMemberId] = useState()
    const router = useRouter()
    const [loan_date, setloan_date] = useState()
    const [loader, setLoader] = useState(false)
    const handlechangeName = (event) => {
        setBookID(event.target.value)
    }




    const handleSubmit = () => {
        setLoader(true)
        let returnDate = new Date(loan_date)
        returnDate.setDate(returnDate.getDate() + 7);

        let convertedLoan = loan_date.toJSON().slice(0, 19).replace('T', ' ')
        let ConvertedReturn = returnDate.toJSON().slice(0, 19).replace('T', ' ')

        axios.post('http://localhost:3001/api/user/borrowbooks', { bookID, loan_date: convertedLoan, memberid: router.query.memberId, returnDate: ConvertedReturn })
            .then((respost) => {
                console.log(respost)
                setBookID()
                setloan_date()
                setLoader(false)
            })
            .catch((reserr) => {
                setLoader(false)
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

                        <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Book<TextField value={bookID} onChange={handlechangeName} sx={{ width: '80%', marginLeft: '120px' }} id="outlined-basic" variant="outlined" /></div>
                        <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>BorrowDate
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    //label="Controlled picker"
                                    value={loan_date}
                                    onChange={(newValue) => setloan_date(newValue)}
                                    sx={{ width: '80%', marginLeft: '57px' }}
                                />
                            </LocalizationProvider>
                        </div>
                        {/* <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Address <TextField value={return_date} onChange={handleChangeAddress} sx={{ width: '80%', marginLeft: '34px' }} id="outlined-multiline-flexible" multiline maxRows={4}
              /></div> */}
                        {/* <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Phone <TextField value={phone} onChange={handlechangePhone} sx={{ width: '80%', marginLeft: '51px' }} id="outlined-basic" variant="outlined" /></div> */}
                        <div className="items-center flex justify-end  ">

                            <button
                                type="button"
                                onClick={() => handleSubmit()}

                                class=" mt-8 text-[#050708] bg-white   focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-6 mb-2 ml-[2px]"
                            >
                                <span className="mr-4">
                                    {loader ? (
                                        <CircularProgress size="22px" />
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

export default borrowBooks



