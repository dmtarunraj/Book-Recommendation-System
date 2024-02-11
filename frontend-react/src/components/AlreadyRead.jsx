import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ImgMediaCard from './Card';

function AlreadyRead() {
    const UserID = useSelector(state => state.userData?.UserID);
    const [readBooks, setReadBooks] = useState([]);
  console.log(UserID)
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/alreadyRead/user/${UserID}`);
        console.log(response)
        if(response?.data?.books){
            setReadBooks(response?.data?.books)
        }
       
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books')
      }
    };

    fetchAllBooks();
  }, [UserID]);
//   console.log(readBooks)

  
  return (
    <div className='p-3'>
         <h1 className='text-2xl font-bold m-3'>Already read books</h1>
          <div>
            <ul className='flex flex-wrap gap-5 justify-center item-center'>
            {
                readBooks && readBooks.map((book)=>(
                    <li key={book?.BookID}>
                   <ImgMediaCard {...book} alreadyRead={true}/>
                    </li>
                ))
            }
            </ul>
        </div>
    </div>
  )
}

export default AlreadyRead