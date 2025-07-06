import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  useBorrowBookMutation,
  useGetBookQuery,
} from '../features/books/bookApi'
import { toast } from 'react-toastify'

const BorrowForm = () => {
  const { bookId } = useParams()
  const { data: book, isLoading, error } = useGetBookQuery(bookId!)
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation()
  const navigate = useNavigate()

 

  const [quantity, setQuantity] = useState(1)
  const [dueDate, setDueDate] = useState('')

  if (isLoading) return <p>Loading book details...</p>
  if (error) return <p>Failed to load book</p>
  if (!book) return <p>Book not found</p>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!book) return

    console.log('Sending borrow payload:', {
      bookId: book._id,
      quantity,
      dueDate,
    })

    if (quantity > book.copies) {
      toast.error('Quantity exceeds available copies')
      return
    }

    try {
      await borrowBook({
        bookId: book._id!,
        quantity,
        dueDate,
      }).unwrap()

      toast.success('Book borrowed successfully')
      navigate('/borrow-summary')
    } catch (error: any) {
      console.error('Borrow failed:', error)
      toast.error('Failed to borrow book')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📤 Borrow Book</h2>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Available Copies:</strong> {book.copies}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          max={book.copies}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={isBorrowing}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {isBorrowing ? 'Borrowing...' : 'Borrow'}
        </button>
      </form>
    </div>
  )
}

export default BorrowForm
