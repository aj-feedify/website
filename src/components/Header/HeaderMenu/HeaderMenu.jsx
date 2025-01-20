import { Link } from 'react-router-dom'
import './HeaderMenu.css'

export default function HeaderMenu({ setMenuOpen }) {
  return (
    <>
      <div className="header_menu">
        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          Account
        </Link>
        <Link
          to="/sign-out"
          className="header_menu_signout"
          onClick={() => setMenuOpen(false)}
        >
          Sign out
        </Link>
      </div>
    </>
  )
}
