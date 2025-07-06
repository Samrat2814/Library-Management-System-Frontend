import { Routes, Route, Navigate } from 'react-router-dom'
import BookList from './pages/BookList'
import CreateBook from './pages/CreateBook'
import BookDetails from './pages/BookDetails'
import EditBook from './pages/EditBook'
import BorrowForm from './pages/BorrowForm'
import BorrowSummary from './pages/BorrowSummary'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
