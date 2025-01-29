# my-movie-api
my-movie-api
is the server-side component of a “movies” web application. The web application provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

# Purpose&Context
My-movie-api is a personal project developed during my web development course at CareerFoundry, showcasing my expertise in server-side programing.
This is an API for an app called “Nightflix” that interacts with a database that stores data about different movies based on MERN-Teckstack (MongoDb, Express, React, Node.js), and access to that data is provided via a REST API (also known as a “RESTful API”).

# The 5 Ws
1. Who: The users of myFlix app—movie enthusiasts who enjoy reading information about different movies.
2. What: A single-page, responsive app with routing, rich interactions, several interface views,
and a polished user experience. The client-side developed in this Achievement will support
the existing server-side by facilitating user requests and rendering the response from 
the server-side via a number of different interface views.
3. When: myFlix users will be able to use it whenever they want to read and save information
about different movies.
4. Where: The app is hosted online. The myFlix app itself is responsive and can therefore be
used anywhere and on any device, giving all users the same experience.
5. Why: Movie enthusiasts like to be able to access information about different movies,
whenever they want to. Having the ability to save a list of their favorite movies will ensure
users always have access to the films they want to watch or recommend to their peers.

# Essential Views & Features:
Main view
-  Returns ALL movies to the user (each movie item with an image, title, and description)
-  Filtering the list of movies with a “search” feature
-  Ability to select a movie for more details
-  Ability to log out
-  Ability to navigate to Profile view
Single Movie view
-  Returns data (description, genre, director, image) about a single movie to the user
-  Allows users to add a movie to their list of favorites
Login view
-  Allows users to log in with a username and password
Signup view
-  Allows new users to register (username, password, email, date of birth)
Profile view
-  Displays user registration details
-  Allows users to update their info (username, password, email, date of birth)
-  Displays favorite movies
-  Allows users to remove a movie from their list of favorites
-  Allows existing users to deregister

# Technical Requirements
-  The application is a single-page application (SPA)
-  The application uses state routing to navigate between views and share URLs
-  The application gives users the option to filter movies using a “search” feature
-  The application uses Parcel as its build tool
-  The application is written using the React library and in ES2015+
-  The application uses Bootstrap as a UI library for styling and responsiveness
-  The application contains function components
-  The application is hosted online
-  The application uses React Redux for state management (i.e.,filtering movies)


# Techstack:
- Express.js: Node.js web framework
- MongoDB: NoSQL database
- Mongoose: MongoDB ODM
- Passport.js: Authentication middleware
- JSDoc: API documentation tool
- Cors: Cross-Origin Resource Sharing middleware
- Bcrypt: Password hashing
- Postman: as testing tool
- REST architecture

## Other tools:
- Terminal: A development environment essential.
- GitHub: For version control;
- Heroku: for deployment

# Showcasing my-movie-api

to see the detailed showcase use the link: 
https://weraseemann.github.io/portfolio-website/mymovieapi_case.html
