import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ImgMediaCard({ Author, BookID, GenreID, Title, GenreName, AvgRating, UserID , alreadyRead = false, interested= false}) {
  const [img, setImage] = useState();
    const userID = useSelector(state => state.userData)
  const navigate = useNavigate();


  async function getRandomImage() {
    let randomId = Math.floor(Math.random() * 1000);
    let img = `https://picsum.photos/id/${randomId}/345/140`;

    try {
      const response = await fetch(img);
      if (response.ok) {
        return img; // Return the image URL if it exists
      }
    } catch (error) {
      // If an error occurs, retry with a new random ID
      return getRandomImage();
    }

    // If the response is not okay, retry with a new random ID
    return getRandomImage();
  }

  useEffect(() => {
    const fetchData = async () => {
      setImage(await getRandomImage());
    //   console.log('Random Image:', img);
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const [rating, setRating] = useState(1); // Set initial rating state, you can adjust it based on your rating scale

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleRateBook = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ratings/addOrUpdateRating', {
        UserID:userID?.UserID,
        BookID,
        Rating: rating,
      });

      // console.log(response.data); // Log the response for debugging

      // Handle success as needed (e.g., show a success message)
    } catch (error) {
      console.error('Error rating the book:', error);

      // Handle error (e.g., show an error message)
    }
  };

  const handleAddToAlreadyRead = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/alreadyRead/add', { UserID: userID?.UserID, BookID });
      
      if (response.data.success) {
       navigate("/books/alreadyRead")
      } else {
        console.error("Failed to add to AlreadyRead");
        // Handle failure as needed
      }
    } catch (error) {
      console.error("Error adding to AlreadyRead:", error);
      // Handle error as needed
    }
  };
  const [isAlreadyRead, setIsAlreadyRead] = useState(null);
  const [isBookInterested, setIsBookInterested] = useState(null);

  const checkIfBookAlreadyRead = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/alreadyRead/check', { UserID: userID?.UserID, BookID: BookID });
      const data = response?.data;
      console.log("res",response)
      if (response.status === 200) {
        setIsAlreadyRead(data?.isBookAlreadyRead);
      } else {
        console.error('Failed to check if book is already read:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error checking if book is already read:', error.message);
    } finally {
     
    }
  };

  const checkIfBookInterested = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/interestedBooks/check', { UserID:  userID?.UserID, BookID });
      const data = response.data;

      if (response.status === 200) {
        setIsBookInterested(data.isBookInterested);
      } else {
        console.error('Failed to check if book is already interested:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error checking if book is already interested:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToInterestedBooks = async () => {
    try {
     

      const response = await axios.post('http://localhost:3000/api/interestedBooks/add', { UserID: userID?.UserID, BookID });

      if (response.status === 200) {
        navigate("/books/interested")
      } else {
        console.error('Failed to add book to InterestedBooks:', response.data.error || response.data.message);
        
      }
    } catch (error) {
      console.error('Error adding book to InterestedBooks:', error.message);
      
    } 
  };
  // Call the checkIfBookAlreadyRead function when the component mounts
  useEffect(() => {
    checkIfBookAlreadyRead();
    checkIfBookInterested();
  }, [userID, BookID]);

 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {Author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {GenreName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {AvgRating ? AvgRating : <p>No Rating</p>}
        </Typography>
        <div className="flex items-center space-x-4">
          <label htmlFor="rating" className="text-sm">
            Rate the book:
          </label>

          {/* Rating input */}
          {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              id={`rating-${value}`}
              name="rating"
              value={value}
              className="hidden"
              onChange={handleRatingChange}
              checked={rating === value}  // Highlight the selected rating
            />
            <span className={`text-xl ${rating === value ? 'text-yellow-500' : 'text-gray-500'}`}>
              {value}
            </span>
          </label>
        ))}
        </div>
      </CardContent>

      <CardActions>
        {!alreadyRead && ( !isAlreadyRead && <Button size="small" onClick={handleAddToAlreadyRead}>Already Read</Button>) }
        {!interested && (!isBookInterested && <Button size="small" onClick={addToInterestedBooks}>Interested</Button>)}
        <Button size="small" onClick={handleRateBook}>
          Rate Book
        </Button>
      </CardActions>
    </Card>
  );
}
