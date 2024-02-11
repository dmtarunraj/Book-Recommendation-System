import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ImgMediaCard from './Card';

function Interested() {
    const userID = useSelector(state => state.userData?.UserID)
    const [interestedBooks, setInterestedBooks] = useState([]);
    // const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchInterestedBooks = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/interestedBooks/user/${userID}`);
          const data = response?.data;
  
          if (response.status === 200) {
            setInterestedBooks(data?.books);
          } else {
            console.error('Failed to fetch interested books:', data.error || data.message);
          }
        } catch (error) {
          console.error('Error fetching interested books:', error.message);
        } finally {
        //   setLoading(false);
        }
      };
  
      fetchInterestedBooks();
    }, [userID]);
    console.log(interestedBooks)
  return (
    <div className='p-3'>
    <h1 className='text-2xl font-bold m-3'>Interested books</h1>
     <div>
       <ul className='flex flex-wrap gap-5 justify-center item-center'>
       {
           interestedBooks && interestedBooks.map((book)=>(
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

export default Interested