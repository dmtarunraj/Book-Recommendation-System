import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import Card from './Card';

function Hero() {
    const [books, setBooks] = useState([]);
    const [searchTerm , setSearchTerm] = useState("");
    const [filteredBooks,setFilteredBooks] = useState();
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
  useEffect(() => {
    setFilteredBooks(books)
    const filteredData = books?.filter((book) =>
      book?.Title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredBooks(filteredData);
  }, [books, searchTerm]);
 
  console.log("books",books)
  return (
    <div className='p-3'>
        <h1 className='text-2xl font-bold m-3'>ALL BOOKS</h1>
        < input type='text' placeholder='Search' className='p-3 ml-3 border border-black' onChange={(e)=>setSearchTerm(e.target.value)} />
        <div className='mt-10'>
            <ul className='flex flex-wrap gap-5 justify-center item-center'>
            {
                filteredBooks && filteredBooks.map((book)=>(
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