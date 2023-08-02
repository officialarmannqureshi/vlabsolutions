# Vlab Solutions

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to Vlab Solutions! This project is a web application designed to assist colleges and students in managing their assignment works and conducting tests online. The platform is built using React for the frontend and Node.js with Express.js for the backend. MongoDB serves as the database to store essential information.

## Features

- **User Authentication**: Students and instructors can create accounts and log in securely.
- **Assignment Management**: Instructors can create assignments, and students can submit their completed work through the platform.
- **Online Testing**: Instructors can design online tests with various question formats (e.g., multiple-choice, short answer) for students to take.  ``` In Progress ```
- **Real-time Notifications**: Users receive notifications for assignment deadlines, test schedules, and other important updates.   ``` In Progress ```
- **Dashboard**: A personalized dashboard for each user, displaying relevant course information and upcoming tasks.
- **Gradebook**: Instructors can review and grade student assignments and tests through the platform.
- **Discussion Forum**: An integrated discussion forum where students and instructors can interact and seek clarifications.   <br> ``` In Progress ```
- **File Uploads**: Users can upload necessary files for assignments and tests.

## Getting Started

To set up Vlab Solutions on your local machine, follow the steps below.

### Prerequisites

- Node.js (v12 or higher) installed on your system
- MongoDB installed and running

### Installation

1. Clone the repository: <br>
```
git clone https://github.com/your-username/vlabsolutions.git 
cd vlabsolutions
```


2. Install frontend and backend dependencies:


3. Configure the environment variables:
-> Create a `.env` file in the `server` directory and set the following variables:

```
PORT=5000
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_secret_key_for_jwt
```

4.Install concurrency dependency :
```
npm i concurrently

```
 - to run multiple commands concurrently


The application should now be running locally on `http://localhost:3000/`.

## Usage

1. Visit `http://localhost:3000/` in your web browser.
2. If you don't have an account, sign up as a student or instructor.
3. Log in with your credentials.
4. Explore the dashboard, create assignments, take tests, and manage your submissions.

## Technologies Used

- Frontend: React
- Backend: Node.js, Express.js ,JWT Authentication, File Upload using Multer and Excel (csv to json) to MongoDB using csvtojson module.
- Database: MongoDB
  
## Screenshots
<img width="400" alt="image" src="https://github.com/officialarmannqureshi/vlabsolutions/assets/91754196/49f93f05-6287-41fd-83df-3c0fe2c02b8e">
<img width="400" alt="image" src="https://github.com/officialarmannqureshi/vlabsolutions/assets/91754196/f92570de-f15f-49bc-96c7-23b53af08441">


## Contributing

Contributions to Vlab Solutions are welcome! If you find any issues or have suggestions for improvements, please feel free to create a pull request or raise an issue.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the terms of the license.

