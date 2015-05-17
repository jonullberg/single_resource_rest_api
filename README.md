Single REST API

#####

What is it?

This application uses HTTP requests to the server to POST, GET, PUT, and DELETE notes that are then saved to mongoDB.

The application uses bcrypt to hash users passwords attached to their email and saves their authentication as a token using the EAT module.

Users must attach an eat token with their requests in order to use the API.