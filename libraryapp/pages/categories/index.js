import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CircularProgress from "@mui/material/CircularProgress";
import { CheckBox } from '@mui/icons-material';
import Stack from '@mui/material/Stack';

function Categories() {

  const [categories, setCategories] = useState([])
  const [openDialog, setOpenDialog] = useState({ state: false, category: '', id: null })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState()
  const [available, setAvailable] = useState(true)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/getcategories`)
      .then((reres) => {
        console.log(reres, "reres")
        setCategories(reres.data)
      })
      .catch((reerr) => {
        console.log(reerr, "reerr")
      })


  }, [])

  const handleopenDialog = (category, id) => {
    console.log("id",id)
    setOpenDialog({ state: true, category: category, id: id });
  };

  const handleClose = (value) => {
    setOpenDialog({ state: false, category: '', id: null });
  };

  const handleSubmit = () => {
    setLoader(true)
    axios.post('http://localhost:3001/api/user/addBook', { title, author, year:parseInt(year), available,category:openDialog.id })
      .then((respost) => {
        console.log(respost)
        setTitle('')
        setAuthor('')
        setYear()
        setAvailable(false)
        setLoader(false)
        setOpenDialog({state:false,category:'',id:null})
      })
      .catch((reserr) => {

      })
  }

  return (
    <div className='container mx-auto'>

      <div className='flex justify-center items-center p-2 font-semibold  text-4xl   '>Categories
      </div>
      <div class='text-2xl mt-[20px]'>
        {categories.map((cg) => {
          return (
            <div className='flex justify-between items-center'>
              <div>{cg.name}</div>
              <button
                type="button"
                onClick={() => handleopenDialog(cg.name, cg.id)}

                class=" mt-8 text-[#050708] bg-white   focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-6 mb-2 ml-[2px]"
              >

                Add New Book
              </button>
            </div>
          )

        })}
      </div>

      <Dialog  open={openDialog.state}   
      PaperProps={{
          sx: {
            width: "w-[950px]",
           padding:'35px'
            
          },
        }}>
        
        <div className='flex justify-center items-center  font-semibold  pb-3 pt-3 text-3xl text-[#e28743] '>Add New Book to {openDialog.category}
        </div>

        <div className=' flex items-center text-[#072b64] mt-2 mb-2 font-bold text-xl'>Title <TextField value={title} onChange={(event)=>setTitle(event.target.value)} sx={{ width: '80%', marginLeft: '126px' }} id="outlined-basic" variant="outlined" /></div>
        <div className=' flex items-center text-[#072b64] mt-2 mb-2 font-bold text-xl'>Author <TextField value={author} onChange={(event)=>setAuthor(event.target.value)} sx={{ width: '80%', marginLeft: '103px' }} id="outlined-basic" variant="outlined" /></div>
        <div className=' flex items-center text-[#072b64] mt-2 mb-2 font-bold text-xl'>Year of Publication <TextField type='number' value={year} onChange={(event)=>setYear(event.target.value)} sx={{ width: '80%', marginLeft: '34px' }} id="outlined-basic" /></div>
        <div className=' flex items-center text-[#072b64] mt-2 mb-2 font-bold text-xl'>Available <CheckBox inputProps={{ 'aria-label': 'controlled' }}
 checked={available} onChange={(event) => setAvailable(event.target.checked)} sx={{ marginLeft: '80px' }} /></div>
      

        <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  spacing={2}
>

<button
            type="button"
            onClick={() => handleClose()}

            class=" mt-2 text-[#050708] bg-white border-2 border-[#050708]  focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-6 mb-2 ml-[2px]"
          >
           
          Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}

            class=" mt-8 text-[white] bg-[#00004e]   focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-6 mb-2 ml-[2px]"
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
          </Stack>
        
      </Dialog>
    </div>
  )
}

export default Categories