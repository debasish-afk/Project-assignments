# Project-assignments

Here I have written 4 apis signup,login,getuser,randomJoke and logout.

//signup api
For signup purpose I make an post api in which I take the user details from request body, validate those details using regex and also check the uniqueness
of email and phone no. by making a db call. Hash the password by using bcrypt package. In the end I save the document in database using the save() method.

//Login api
For login I make an post api, I simply make a db call using the findOne method and give the condition username, Whichever document match that username we get that document.
After that I take the password from that document and match it from the input password by using the comparesync funtion of bcrypt and if it is match then Simply generate
a token using the sign method of jsonwebtoken. Inside the
