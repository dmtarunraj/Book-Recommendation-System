import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import Card from './Card';

function Hero() {
    const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books/allBooks');
        setBooks(response?.data?.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
      }
    };

    fetchAllBooks();
  }, []);
  console.log("books",books)
  return (
    <div className='p-3'>
        <h1 className='text-2xl font-bold m-3'>ALL BOOKS</h1>
        <div>
            <ul className='flex flex-wrap gap-5 justify-center item-center'>
            {
                books && books.map((book)=>(
                    <li key={book?.BookID}>
                   <Card {...book}/>
                    </li>
                ))
            }
            </ul>
        </div>
        
    </div>
  )
}

export default Hero