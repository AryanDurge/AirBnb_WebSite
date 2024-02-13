---

# Airbnb Clone

This project is a clone of the popular Airbnb website, built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to replicate the core features and functionalities of Airbnb, allowing users to browse, search, and book accommodations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up, log in, and log out securely. Authentication is handled using JSON Web Tokens (JWT).
- **Listings**: Users can view available accommodations, including details such as price, location, and amenities.
- **Booking**: Users can select dates and book accommodations. Booking information is stored securely.
- **Admin Panel**: Administrators can manage listings through an intuitive admin panel.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd airbnb-clone
   ```

3. Install dependencies for both the client and server:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following variables in the `.env` file:
     ```
     PORT=3001
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. Seed the database (optional):

   ```bash
   cd server && npm run seed
   ```

## Usage

1. Start the server:

   ```bash
   cd server && npm start
   ```

2. Start the client:

   ```bash
   cd client && npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Technologies Used

- **Frontend**:
  - React.js
  - React Router

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Authentication**:
  - JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README according to your project's specifics and add any additional information you find relevant.
