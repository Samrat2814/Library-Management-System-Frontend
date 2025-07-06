# 📚 Minimal Library Management System (Frontend)

A clean and minimal **Library Management System** frontend built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.  
This project connects to a RESTful API backend to manage books and borrow records — focusing on core functionality without authentication, category filters, or payment integration.

---

## ✨ Features

✅ **Book Management**
- View all books in a tabular format  
- Add new books  
- Edit or delete existing books  
- Borrow books with validation (due date & quantity)  
- Auto mark books as unavailable when copies reach 0  

✅ **Borrowing System**
- Borrow form with validation
- Quantity must not exceed available copies
- Updates backend and UI immediately
- Redirects to borrow summary

✅ **Borrow Summary**
- Aggregated report of borrowed books
- Displays book title, ISBN, and total quantity borrowed

✅ **Responsive UI**
- Minimalist, clean, and responsive layout using Tailwind CSS

✅ **Toast Notifications**
- Real-time feedback on actions like create, update, delete, and borrow

---

## 🧱 Tech Stack

| Layer            | Technology                            |
|------------------|----------------------------------------|
| Frontend         | React + TypeScript                     |
| State Management | Redux Toolkit + RTK Query              |
| Styling          | Tailwind CSS                           |
| Backend API      | Node.js + Express.js                   |
| Database         | MongoDB + Mongoose                     |

---

## 🚦 Pages & Routes

| Route               | Description                        |
|---------------------|------------------------------------|
| `/books`            | Show all books                     |
| `/create-book`      | Add a new book                     |
| `/books/:id`        | Book details page                  |
| `/edit-book/:id`    | Edit a book                        |
| `/borrow/:bookId`   | Borrow book form                   |
| `/borrow-summary`   | Aggregated borrow summary          |

