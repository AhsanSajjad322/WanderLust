Sure! Below is a detailed `README.md` file for your project. This file provides an overview of the project, installation instructions, usage, and other relevant details.

```markdown
# WanderLust

WanderLust is a web application designed for users to list and review various travel destinations. Users can create an account, log in, list new destinations, and review existing ones. The application is built using Node.js, Express, MongoDB, and EJS for templating.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Routes](#routes)
- [Middleware](#middleware)
- [Views](#views)

## Features
- User authentication with Passport.js
- CRUD operations for travel listings
- Review system for each listing
- Flash messages for notifications
- Server-side validation using Joi
- Session management with MongoStore
- Image upload with Multer
- Dynamic EJS templates

## Installation

### Prerequisites
- Node.js (>=18.12.0 <19.0.0)
- MongoDB

### Steps
1. Clone the repository
   ```bash
   git clone https://github.com/AhsanSajjad322/WanderLust.git
   cd WanderLust
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and add the following:
   ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_SECRET_KEY=your_cloudinary_secret_key
    ATLASDB_URL=your_mongodb_atlas_url
    SECRET=your_secret_key
   ```

4. Start the server
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3002`

## Usage
- Visit the home page to view all listings
- Sign up or log in to create a new listing or review an existing one
- Use the search bar to find specific listings
- Filter listings based on different categories

## Folder Structure
```
WanderLust/
│
├── cloudConfig.js
├── controller/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── schema.js
├── server.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
└── views/
    ├── includes/
    ├── layouts/
    ├── listings/
    ├── users/
    ├── error.ejs
```

## Routes

### Listings
- `GET /listings`: Get all listings
- `POST /listings`: Create a new listing
- `GET /listings/new`: Render form to create a new listing
- `GET /listings/:id`: Show a specific listing
- `PUT /listings/:id`: Update a listing
- `DELETE /listings/:id`: Delete a listing
- `GET /listings/:id/edit`: Render form to edit a listing

### Reviews
- `POST /listings/:id/reviews`: Create a new review
- `DELETE /listings/:id/reviews/:reviewId`: Delete a review

### Users
- `GET /register`: Render registration form
- `POST /register`: Register a new user
- `GET /login`: Render login form
- `POST /login`: Log in a user
- `GET /logout`: Log out a user

## Middleware

### Custom Middleware
- `isLoggedIn`: Checks if a user is authenticated
- `saveRedirectUrl`: Saves the URL the user was trying to access before logging in
- `isOwner`: Checks if the logged-in user is the owner of a listing
- `isReviewAuthor`: Checks if the logged-in user is the author of a review
- `validateListing`: Validates listing data using Joi
- `validateReview`: Validates review data using Joi

## Views
- **listings/index.ejs**: Displays all listings with filters and search functionality
- **listings/show.ejs**: Displays a single listing with reviews
- **listings/new.ejs**: Form to create a new listing
- **listings/edit.ejs**: Form to edit an existing listing
- **reviews/new.ejs**: Form to create a new review
- **reviews/edit.ejs**: Form to edit an existing review
- **users/register.ejs**: Form to register a new user
- **users/login.ejs**: Form to log in
- **includes/navbar.ejs**: Navbar incldues
- **partials/footer.ejs**: Footer includes
- **error.ejs**: Error page

```