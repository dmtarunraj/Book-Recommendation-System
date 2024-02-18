import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ImgMediaCard from './Card';

function Recommended() {
  const userData = useSelector(state => state.userData)
  const [books , setBooks] = useState();
  useEffect(()=>{
    const fetchBooks = async ()=>{
      try{
        const res = await axios.get('http://localhost:3000/api/recommendations',{params:{Age:userData?.Age , Gender:userData?.Gender}})
        // console.log(res)
        if(res?.status === 200){
          setBooks(res?.data?.data);
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchBooks()
  },[])
  console.log(userData)
  return (
    <div className='p-3'>
    <h1 className='text-2xl font-bold m-3'>Recommended books</h1>
     <div>
       <ul className='flex flex-wrap gap-5 justify-center item-center'>
       {
           books && books.map((book)=>(
               <li key={book?.BookID}>
              <ImgMediaCard {...book} interested={true}/>
               </li>
           ))
       }
       </ul>
   </div>
</div>
  )
}

export default Recommended