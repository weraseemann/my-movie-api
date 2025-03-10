# my-movie-api
my-movie-api
is the server-side component of a “movies” web application. The web application provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

# Purpose&Context
My-movie-api is a personal project developed during my web development course at CareerFoundry, showcasing my expertise in server-side programing.
This is an API for an app called “Nightflix” that interacts with a database that stores data about different movies based on MERN-Teckstack (MongoDb, Express, React, Node.js), and access to that data is provided via a REST API (also known as a “RESTful API”).

# Objective
The overall goal of the project was to build a REST API.

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


### Development process
1. Planning and Preparation
To begin the development process, I started by writing user stories based on the app’s key features. These user stories served as the foundation for understanding the application's core functionality and user requirements. I set up the project directory: Created the project repository, deployed the initial structure of the project, and pushed the first commit to GitHub.

2. Node.js Modules
In the "my-movie-api" project, at the beginning of the project I implemented the following components and functionality: Created Key Files:

- documentation.html: API usage guide for developers: Contains instructions for developers on how to use the API.
- index.html: Serves as the default landing page for general requests.
- server.js: The main server script that handles incoming requests: The server implementation importing http, fs, and url modules.
- log.txt: Stores logs of incoming requests URLs and timestamps. for tracking purposes.
-  test.js: File for testing and verifying the functionality of the API.
- Server Setup: Used the http module to create a server that listens on port 8080. Imported the url module to parse incoming request URLs.
- Request Handling: If the request URL contains the word "documentation", the server responds with the documentation.html file. For all other requests, the server responds with the index.html file.
- Logging: Integrated the fs module in server.js to log every incoming request URL and timestamp to the log.txt file for debugging and analytics.
3. Packages and Package Managers
At this point I deleted the test.js and server.js files. Created an index.js file in the project directory, initialized the project using npm init, generating a package.json file with the main field set to index.js and installed essential local dependencies:

- Express: Installed via npm install express.
body-parser: Installed via npm install body-parser.

Added the node_modules folder to a .gitignore file to exclude it from version control, as all dependencies are tracked in package.json. This setup establishes the foundation for building and running the application.
4. Web Server Frameworks and Express: Refactoring
Setup and Folder Structure: Ensured the project directory contained the following essential files and folders:

- index.js: Main JavaScript file.
package.json and package-lock.json: Dependency configuration files.
- node_modules: Directory for installed modules.
public folder: Contains a documentation.html file for API documentation.
- Express Integration: Required the Express framework in index.js. Created two GET routes:
- /movies: Returns a JSON object with data about the top 10 movies;
- /: Returns a default text response.
- Tested routes by running the project and verifying the correct responses in the browser.
- Static File Serving: Used express.static to serve the documentation.html file from the public folder. - Verified by accessing localhost:[port]/documentation.html in the browser.
- Request Logging with Morgan: Integrated the Morgan middleware to log all incoming requests to the terminal and tested by navigating to multiple pages and confirming the logs in the terminal.
- Error Handling: Implemented an error-handling middleware function in index.js. Logged all application-level errors to the terminal for debugging purposes.
This refactoring improved the application’s maintainability, modularity, and efficiency by leveraging the Express framework.
5. REST and API Endpoints
As defined the REST API must do the following:

- Return a list of ALL movies to the user;
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user;
- Return data about a genre (description) by name/title (e.g., “Thriller”);
- Return data about a director (bio, birth year, death year) by name;
- Allow new users to register;
- Allow users to update their user info (username);
- Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later);
- Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later);
- Allow existing users to deregister (showing only a text that a user email has been removed—more on this later).
I defined and documented the endpoints for theREST API to facilitate such user behavior and tested the endpoints using Postman as well as added documentation for each of the endpoints to the “documentation.html” file.
6. Non-Relational Databases and MongoDB
Created a non-relational (NoSQL) database using MongoDB: installed, configured and ran a MongoDB database.
- Movies Collection: Added about 10 movie documents to a “movies” collection. Used embedded documents to store information about genre, director, and additional attributes in a standardized format between all documents in the collection.
- Users Collection: Added at least 5 user documents to a “users” collection. The Birthday attribute is stored as a Date data type. Used references to store a list of favorite movies for each user.
- Made changes to the Database querying it: performing various operations like finding, filtering, sorting, updating, and deleting.


7. The Business Logic Layer
Created the schema for the database using Mongoose models so that they can be used by the rest of the application.

8. Authentication and Authorization
Implemented authentication and authorization into the API using basic HTTP authentication and JWT (token-based) authentication.
Integrated two Passport strategies as middleware into each of the existing API endpoints so that only users with a JWT token can make requests to your API and tested each method using Postman.


9. Data Security, Validation and Ethics
Modified API to align with data security regulations: Implement data security and storage controls. incorporated data validation logic into the API.

Deployed the API to online hosting service: hosted the API to the cloud PaaS (Platform as a Service) platform Heroku. Deployed the database to the cloud-based database hosting platform MongoDB Atlas, and made sure all these moving parts of the app are synced up to work perfectly together.

### Conclusion
The my-movie-api project was a comprehensive backend development exercise that showcased the process of designing and implementing a robust RESTful API for a movie database application, "Nightflix." From conceptualization to deployment, this project demonstrated the use of the MERN stack to build a functional server-side application.
By integrating technologies like Node.js, Express.js, and MongoDB, the project effectively managed routing, user authentication, data storage, and API functionality. Key achievements included the implementation of RESTful API endpoints, user authentication with JWT and Passport.js, secure data storage using MongoDB Atlas, and deploying the application on Heroku for real-world access.
This project emphasized modularity, maintainability, and scalability, with features such as logging using Morgan, error handling, and static file serving. Testing tools like Postman ensured the API's functionality and security compliance. With this solid foundation, the project paves the way for the development of a polished client-side interface in the next phase, making it a significant addition to any portfolio.