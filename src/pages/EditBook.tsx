import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '../features/books/bookApi'
import { toast } from 'react-toastify'

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: book, isLoading } = useGetBookQuery(id!)
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || '',
        copies: book.copies,
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'copies' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const available = formData.copies > 0
    try {
      await updateBook({ id: id!, data: { ...formData, available } }).unwrap()
      toast.success('Book updated successfully!')
      navigate('/books')
    } catch {
      toast.error('Failed to update book')
    }
  }

  if (isLoading) return <p>Loading book info...</p>

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="FICTION|NON_FICTION|SCIENCE|HISTORY|BIOGRAPHY|FANTASY"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="copies"
          placeholder="Copies"
          value={formData.copies}
          onChange={handleChange}
          required
          min={0}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  )
}

export default EditBook
