# Paytm Clone

A full-stack web application that replicates the core functionality of Paytm, an Indian digital payment platform. This project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to demonstrate a real-world payment system, user authentication, and transactional features.

## Features

- **User Authentication:** Secure login/signup using JWT (JSON Web Tokens).
- **Digital Wallet:** Manage your funds and transactions with a virtual wallet.
- **Payments:** Perform seamless peer-to-peer transactions.
- **Responsive Design:** Fully responsive UI using React and Bootstrap/TailwindCSS.

## Tech Stack

- **Frontend:** React.js, TailwindCSS/Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js for password encryption
- **API Integration:** Axios for handling API requests
- **Payment Gateway (Optional):** You can integrate a payment gateway like Razorpay or Stripe for actual transactions.

## Installation and Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Sairajepawar/paytm--clone.git
    cd paytm--clone
    ```

2. **Install dependencies for both frontend and backend:**
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root of the `server` directory with the following values:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. **Run the development servers:**

    - Start the backend:
      ```bash
      cd server
      npm start
      ```

    - Start the frontend:
      ```bash
      cd client
      npm start
      ```

5. **Access the application:**
    Open [http://localhost:3000](http://localhost:3000) to view the frontend and [http://localhost:5000](http://localhost:5000) for the backend API.

## Folder Structure

```
.
├── client                # Frontend (React)
│   ├── public            # Public assets
│   └── src               # React components and Redux store
├── server                # Backend (Node.js, Express)
│   ├── config            # Database and environment configurations
│   ├── controllers       # Route controllers
│   ├── models            # Mongoose schemas/models
│   └── routes            # Express API routes
└── README.md             # Project documentation
```

## Contributing

Feel free to fork this repository and contribute to improve the features or fix bugs. Create a pull request if you would like to add new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### MIT License

```
MIT License

Copyright (c) [2024] [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

This README provides a basic overview of the project structure, installation, and licensing. Let me know if you'd like to add or modify any specific sections!
