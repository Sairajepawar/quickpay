
# QuickPay

**QuickPay** is a full-stack web application  which provides virtual digital payment platform. This project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to simulate a real-world payment system, user authentication, and transactional features. The application is designed to be responsive, secure, and scalable, offering essential features such as, peer-to-peer payments, and user-friendly navigation.

## Features

- **User Authentication:** 
   - Secure login and signup process utilizing JWT (JSON Web Tokens) to maintain user sessions. 
   - Passwords are encrypted using bcrypt.js for enhanced security.
   - Session persistence across various devices is ensured with tokens.

- **Digital Wallet:**
   - Users can create and manage a virtual wallet to handle their funds.

- **Payments:**
   - Seamlessly perform peer-to-peer transactions between registered users.

- **Responsive Design:**
   - Built using React and styled with TailwindCSS to ensure a smooth and responsive UI/UX.

## Tech Stack

- **Frontend:**
  - React.js for creating dynamic and responsive user interfaces.
  - TailwindCSS for styling and layout.
  - Axios for handling asynchronous HTTP requests between the client and server.

- **Backend:**
  - Node.js and Express.js for handling server-side logic, API routes, and request handling.
  - JWT for managing user authentication and session security.
  - Bcrypt.js for hashing and securing passwords.

- **Database:**
  - MongoDB as the primary database to store user details, transactions, and wallet information.
  - Mongoose as the Object Data Modeling (ODM) library for MongoDB.
## Installation and Setup

### Prerequisites
- **Node.js** and **npm** installed on your local machine.
- **MongoDB** set up locally or use a cloud database (e.g., MongoDB Atlas).

### Steps to Run Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Sairajepawar/quickpay.git
    cd quickpay
    ```

2. **Install dependencies for both frontend and backend:**
    - Frontend:
      ```bash
      cd frontend
      npm install
      ```

    - Backend:
      ```bash
      cd backend
      npm install
      ```

3. **Set up environment variables:**
    - Create a `.env` file in the `backend` directory with the following values:
    ```bash
    PORT=3000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

    - Create a `.env` file in the `frontend` directory with the following values:
    ```bash
      VITE_API_BASE_URL=api_url
    ```
    for running locally ``` api_url=http://localhost:3000```

4. **Run the development servers:**
    - Start the backend server:
      ```bash
      cd backend
      node index.js
      ```

    - Start the frontend development server:
      ```bash
      cd frontend
      npm run dev
      ```

5. **Access the application:**
    - Frontend: Open [http://localhost:5173](http://localhost:5173)
    - Backend API: Open [http://localhost:3000](http://localhost:3000)

6. **Test the features:**
   - Sign up or log in to create a user account.
   - Access your virtual wallet, send payments.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
