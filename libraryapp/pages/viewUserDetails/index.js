import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';

function ViewUserDetails() {
  const router = useRouter()
  const [input, setInput] = useState()
  const [searchId, setSearchId] = useState()
  const [loader, setLoader] = useState(false)
  const [username, setusername] = useState()
  const [email, setemail] = useState()
  const [address, setAddress] = useState()
  const [phone, setPhone] = useState()
  const [borrowedbooks, setborrowedBooks] = useState()

  useEffect(() => {
    setInput(document.getElementById("myInput"))
    if (input !== undefined) {
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("myBtn").click();
        }
      });
    }

  }, [])

  const searchuser = () => {
    setLoader(true)
    if (setSearchId !== undefined) {
      console.log("searchId", searchId)
      axios.get(`http://localhost:3001/api/user/finduser?userid=${searchId}`)
        .then((reres) => {
          console.log(reres, "reres")
          setusername(reres.data[0].name)
          setemail(reres.data[0].email)
          setAddress(reres.data[0].address)
          setPhone(reres.data[0].phone)
          axios.get(`http://localhost:3001/api/user/userBorrowed?userid=${searchId}`)
            .then((bookres) => {
              console.log("bookres", bookres.data.books)
              let booksCount = bookres.data.books
            
                setborrowedBooks(bookres.data.books)
              
             
              setLoader(false)
            })
            .catch((bookerr) => {
              console.log(bookerr, "reerr")
            })
          setLoader(false)
        })
        .catch((reerr) => {
          console.log(reerr, "reerr")
        })
    }

  }

  if (loader === false) {
    return (
      <div className='container mx-auto'>
        <div className='flex justify-center items-center p-2 font-semibold  text-4xl   '> Search User
        </div>
        <div className="container mx-auto p-8 h-screen flex justify-center items-center">
          <div className=" w-[800px] bg-slate-300 rounded-lg p-[10px] pb-[10px]!important mb-8 border-b-2  border-white mt-6">

            <div className='text-white p-8' >

              <div className='flex justify-center items-center  font-semibold  pb-3 pt-3 text-3xl text-[#e28743] '>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >

                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    id="myInput"
                    numeric
                    placeholder="Enter the user ID"
                    inputProps={{ 'aria-label': 'search user' }}
                    onChange={(event) => setSearchId(event.target.value)}
                  />
                  <IconButton id="myBtn" onClick={(event) => searchuser()} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>

                </Paper>
              </div>

              <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Name : {username}</div>
              <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Email : {email}</div>
              <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Address : {address}</div>
              <div className=' flex items-center text-[#072b64] mt-2 font-bold text-xl'>Phone : {phone}</div>
             
              {borrowedbooks!==undefined && borrowedbooks.length !== 0 ? <>
                <div className='flex justify-center items-center text-2xl text-black mt-10'>Borrowed Books</div>
              <div className='flex justify-between items-center'>
                <div className=' flex  items-center text-[#e28743] mt-2 font-bold text-xl'>S.no</div>
                <div className=' flex items-center text-[#e28743] mt-2 font-bold text-xl'>Book</div>
                <div className=' flex items-center text-[#e28743] mt-2 font-bold text-xl'>Author</div>
                <div className=' flex items-center text-[#e28743] mt-2 font-bold text-xl'>Year of Publication</div>
              </div>
              {borrowedbooks.map((books, index) => {
                return (
                  <div className='flex justify-between items-center' key={index}>
                    <div className=' flex justify-center items-center text-[#072b64] mt-2 font-bold text-xl'>{index + 1}</div>
                    <div className=' flex justify-center items-center text-[#072b64] mt-2 ml-[-80px] font-bold text-xl'>{books.title}</div>
                    <div className=' flex justify-center items-center text-[#072b64] mt-2 ml-[-130px] font-bold text-xl'>{books.author}</div>
                    <div className=' flex justify-center items-center text-[#072b64] mt-2  font-bold text-xl'>{books.publication_year}</div>
                  </div>
                )
              })}
               <div class='flex justify-end items-center'>
              <button class=' min-w-min p-4 bg-[white] text-[black] border-1 rounded-sm' onClick={() => router.push({ pathname: "/borrowbooks", query: { memberId: searchId } })}>Borrow Books</button>
            </div>
              </> : <>
              {borrowedbooks!==undefined ? <><div className='flex justify-center items-center text-lg text-black mt-10'>No Borrowed Books</div>
               <div class='flex justify-center items-center text-xl mt-5'>
              <button class=' min-w-min p-4 bg-[#464775] text-[white] border-1 rounded-md' onClick={() => router.push({ pathname: "/borrowbooks", query: { memberId: searchId } })}>Borrow now</button>
            </div></> : <>
            
            </> }
              </>}
              
            </div>
           
          </div>

        </div>

      </div>
    )
  }
  else {
    return (
      <div className='container mx-auto flex items-center justify-center mt-[80px]'> <div class='loader'></div></div>
    )

  }



}

export default ViewUserDetails