import { useNavigate } from 'react-router-dom'
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '../features/books/bookApi'
import { toast } from 'react-toastify'
import type { IBook } from '@/features/books/book.types'

const BookList = () => {
  const { data, isLoading } = useGetBooksQuery()
  const [deleteBook] = useDeleteBookMutation()
  const navigate = useNavigate()
  console.log(data)
  

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap()
        toast.success('Book deleted successfully')
      } catch {
        toast.error('Failed to delete book')
      }
    }
  }

  if (isLoading) return <p>Loading books...</p>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📚 All Books</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Genre</th>
              <th className="p-2 text-left">ISBN</th>
              <th className="p-2 text-left">Copies</th>
              <th className="p-2 text-left">Available</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book: IBook) => (
              <tr key={book._id} className="border-t">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">{book.copies}</td>
                <td className="p-2">
                  {book.available ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id!)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    className="text-green-600 hover:underline"
                  >
                    Borrow
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookList
