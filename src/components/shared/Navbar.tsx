import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          📚 Library System
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) => isActive ? 'underline' : ''}
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-book"
              className={({ isActive }) => isActive ? 'underline' : ''}
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) => isActive ? 'underline' : ''}
            >
              Borrow Summary
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
