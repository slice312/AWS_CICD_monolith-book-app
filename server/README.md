Run server
```
npm start
```
The server will run on port 1717 (http://localhost:1717)

**To get a list of all books**  
`GET /books`

**To get one book by id**  
`GET /books/:id`

**To create a new book**  
`POST /books/create`
object id is generated on the server

**To edit a book**  
`PUT /books/update/:id`  

**To delete a book**  
`DELETE /books/delete/:id`  


## Authorization 

**For get user data**  
In X-Auth header must pass token.
If token is invalid or missing, a 403 error will be returned in the response.
`GET /me`
in success response will return object
```
  username: string
  firstName: string (optional)
  age: number (optional)
```


**For registration new user**  
`POST /signin`
body must contain an object of the form
```
  username: string
  password: string
  firstName: string (optional)
  age: number (optional)
```
in response
```
  token: string // token
  data: object // user data
```

**For login**  
`POST /login`
body must contain an object of the form
```
  username: string
  password: string
```
in response
```
  token: string // token 
  data: object // user data
```