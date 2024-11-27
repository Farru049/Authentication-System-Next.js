<<<<<<< HEAD
Here's a README file tailored for your Authentication project: 

=======
>>>>>>> aef73faaecbbb402a51c2f738c94b963ec265f18
---

# Authentication System with Next.js

A robust and secure user authentication system built using Next.js. This project includes user signup, login, email verification, and password reset functionalities, demonstrating the integration of modern web technologies.

## 🚀 Features

- **User Signup**: Securely register users with email and password.
- **Login**: Authenticate users with encrypted passwords.
- **Email Verification**: Verify users' email addresses via unique token-based links.
- **Password Reset**: Allow users to reset forgotten passwords.
- **Environment Variables**: Keep sensitive credentials secure using `.env`.

## 🛠️ Technologies Used

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, MongoDB, Mongoose, Axios
- **Email Service**: Nodemailer (with Mailtrap)
- **State Management**: React hooks
- **Security**: Bcrypt.js for password hashing, JWT for token management

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Farru049/Authentication-Next.js.git
   cd Authentication-Next.js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file and configure the following:
   ```
   MONGODB_URI=<Your_MongoDB_URI>
   TOKEN_SECRET=<Your_Secret_Token>
   DOMAIN=<Your_Domain_or_Localhost>
   MAILTRAP_USER=<Your_Mailtrap_User>
   MAILTRAP_PASS=<Your_Mailtrap_Password>
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Access the application at `http://localhost:3000`.

## 🔑 Authentication Workflow

1. **Signup**:
   - Users provide their email, password, and username.
   - A verification email is sent with a unique token.

2. **Email Verification**:
   - Users click the link sent to their email to verify their account.
   - The token is validated against the database.

3. **Login**:
   - Users log in with their email and password.
   - Credentials are verified against hashed passwords stored in MongoDB.

4. **Password Reset**:
   - Users can request a password reset link.
   - A reset token is emailed, allowing them to update their password.

## 📁 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── verifyemail/
│   │   └── api/
│   │       ├── users/
│   │       │   ├── signup/
│   │       │   ├── login/
│   │       │   └── verifyemail/
│   ├── models/
│   ├── dbConfig/
│   └── utils/
├── public/
└── .env.example
```

## 💻 Demo

For a live demo or screenshots, visit the repository: [Authentication-Next.js](https://github.com/Farru049/Authentication-Next.js).

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

