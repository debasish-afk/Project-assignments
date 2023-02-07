# Project-assignments

Here I have written 4 apis signup,login,getuser,randomJoke and logout.

//signup api
For signup purpose I make an post api in which I take the user details from request body, validate those details using regex and also check the uniqueness
of email and phone no. by making a db call. Hash the password by using bcrypt package. In the end I save the document in database using the save() method.

//Login api
For login I make an post api, I simply make a db call using the findOne method and give the condition username, Whichever document match that username we get that document.After that I take the password from that document and match it with the input password by using the comparesync funtion of bcrypt and if it is matched then Simply generate a token using the sign method of jsonwebtoken. While making the token I put the id as the payload, a secret key and the expiry time of the token. Then I generate the token and send the response of that token.


//Get profile api
To see the profile I simply use the get http method and use findById function, then pass id as condition to that, if it find any document with that id, it will simply return that document as a response. when we do the request we pass that id in path params. Here I also pass a middlewear for authentication.

//random joke
Here a url is given. I just make a get axios call to fetch the data from that url, every time I hit the api a new random joke shows up in the response body.

//log out api
In logout api I just have to remove the token from the cookies, thats why I use clearCookie function to remove the jsonwebtoken from the browser cookies.
