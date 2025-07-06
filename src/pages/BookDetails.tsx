import { useParams, Link } from "react-router-dom"
import { useGetBookQuery } from "@/features/books/bookApi"

const BookDetails = () => {
  const { id } = useParams()
  const { data: book, isLoading, isError } = useGetBookQuery(id!)

  if (isLoading) return <p className="text-center">Loading book...</p>
  if (isError || !book) return <p className="text-center text-red-600">Book not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>

      <div className="space-y-2 text-lg">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Copies:</strong> {book.copies}</p>
        <p><strong>Available:</strong> {book.copies > 0 ? "Yes ✅" : "No ❌"}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>

      <div className="mt-6 space-x-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ✏️ Edit Book
        </Link>

        <Link
          to={`/borrow/${book._id}`}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📚 Borrow Book
        </Link>
      </div>
    </div>
  )
}

export default BookDetails
