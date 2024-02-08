const axios = require('axios')


axios.post('http://localhost:3000/api/user/createUser',{Email:"abhi@gmail.com", password:"abhi@123", username:"abhi",Age:"20",Gender:"male"})
.then(res=>console.log(res)).catch(err=>console.log(err))

function login() {
    // Perform login logic (replace this with your actual login implementation)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy login logic for demonstration purposes
    if (username === 'demo' && password === 'demo') {
        // Redirect to the registration page
        window.location.href = 'registration.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function completeRegistration() {
    // Perform registration logic (replace this with your actual registration implementation)
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    // Dummy registration logic for demonstration purposes
    alert(`Registration successful!\nGender: ${gender}\nEmail: ${email}\nAge: ${age}`);
    window.location.href = 'recommendations.html';
}
window.onload = function() {
    // Get age from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const age = urlParams.get('age');
    
    // Fetch initial book recommendations based on age using Google Books API
    fetchRecommendations(age);
}
let listType = 'wantToRead';

window.onload = function() {
    // Get age from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const age = urlParams.get('age');
    
    // Fetch initial book recommendations based on age using Google Books API
    fetchRecommendations(age);
}

async function fetchRecommendations(age) {
    // Fetch book recommendations based on age using Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=5`);
    const data = await response.json();
    console.log(data)
    // Extract book titles from the response
    const recommendations = data?.items.map(item => item.volumeInfo.title);

    displayRecommendations(recommendations);
}

async function searchBooks() {
    // Get the search query from the input field
    const searchQuery = document.getElementById('searchInput').value;

    // Fetch book recommendations based on search query using Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=5`);
    const data = await response.json();

    // Extract book titles from the response
    const searchResults = data.items.map(item => item.volumeInfo.title);

    displaySearchResults(searchResults);
}

function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '<h2>Top Recommendations:</h2>';

    if (recommendations.length === 0) {
        recommendationsContainer.innerHTML += '<p>No recommendations available.</p>';
    } else {
        recommendations.forEach((book, index) => {
            recommendationsContainer.innerHTML += `<p>${index + 1}. ${book}</p>`;
        });
    }
}

function displaySearchResults(searchResults) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '<h2>Search Results:</h2>';

    if (searchResults.length === 0) {
        recommendationsContainer.innerHTML += '<p>No results found.</p>';
    } else {
        searchResults.forEach((book, index) => {
            recommendationsContainer.innerHTML +=` <p>${index + 1}. ${book}</p>`;
        });
    }
}