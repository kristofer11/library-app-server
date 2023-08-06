# Library Server
## Project Description
This is a REST API that accompanies our library manager app (https://github.com/kristofer11/library-manager, catchy name coming soon). The idea behind the overall project is that users can add a book to their "bookshelf" as they read books. They can keep track of what they have read, rate books, store reviews, etc. 

This API is connected to our MongoDB database. There are separate collections of registered users and libraries. If no library document is associated with the user a library document is created when the user adds their first book. It is associated with the user's _id. 

This API provides the following endpoints:

### users 
Endpoints are provided for users to 
* Get account data (GET /api/users/me)
* Register for an account (POST /api/users) 
* Update their account (PUT /api/users/me), 
* Login (POST /api/users/login).
/api/users for users (register, update, delete, login, etc) and their libraries (create a new library, add a book, delete a book, etc.)

### library
Library endpoints access data within the library document of validated user (validated using JSON Web Token)
* Get a specific book from user's library (GET /api/library/:id/books/:bookId)
* Get all books from user's library (GET /api/library/:id/books)
* Add a new book (POST /api/library/:id/books)
* Update a specific book (PUT /api/library/:id/books/:bookId)
* Delete a specific book (DELETE /api/library/:id/books/:bookId)
* Drop entire library (DELETE /api/library/:id)