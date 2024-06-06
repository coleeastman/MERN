Hey, I'm Cole and this is my first MERN project. I made this project from scratch with little knowledge of the MERN stack and learned many technologies and techniques on the way. I have been working 40 hours per week at my current job while building this project, but I hope my project still impresses the team. I dedicated most of my time to the User Authentication because in the interview, it was mentioned this is something I would be working on as an intern. I hope you enjoy!

Video Demonstration

• https://asu.zoom.us/rec/share/Tg9stkuWQCreXCriVe2GYIfFsaerq6gUKkEikQVzWHqE66t2n4htHmMW418PRhkS.-Tzf7DdP01-S0FAT?startTime=1717655479000

Passcode: UA#!qY9j

Overview

• Serenity is a MERN stack-based chat application. It allows users to sign up, verify their email, and chat. It features a frontend built with React, a backend built with Node.js and Express, and MongoDB for data storage. The application uses JWT for authentication and includes various security measures.

Features

• User Authentication: Sign up, log in, and log out functionalities with JWT for secure user sessions.

• Email Verification: New users receive a verification code via email which they must enter to activate their account.

• Real-Time Messaging: Users can send and receive messages in real-time.

• Responsive Design: The application is designed to be responsive and user-friendly across different devices.


Technical Details

Frontend

• React: For building the user interface.

• Axios: For making HTTP requests to the backend.

• Context API: For managing authentication state across the application.

Backend

• Node.js and Express: For building the RESTful API.

• MongoDB and Mongoose: For data storage.

• JWT: For secure authentication and authorization.

• Nodemailer: For sending verification emails.

• Environment Variables: For storing sensitive data like email credentials and JWT secrets.

Security Measures

• Password Hashing: Using bcrypt to securely hash user passwords before storing them in the database.

• JWT Authentication: Ensures that only authenticated users can access certain endpoints.

• Environment Variables: Sensitive information is stored in a .env file and accessed through process.env.
