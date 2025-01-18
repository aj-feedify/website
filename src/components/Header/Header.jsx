import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <>
      <div className="container_header">
        <div className="container">
          <header className="header d_f_ai_ce">
            <div className="header_content d_f_jc_sb">
              <div className="logo">
                <Link to="/">Feedify</Link>
              </div>
              <div className="header_links list_x">
                <Link to="https://akbarswe.uz">About me</Link>
                <Link to="/dashboard">Dashboard</Link>
                <div className="d_f">
                  <Link to="/login">Login</Link>
                  <div>/</div>
                  <Link to="/signup">Signup</Link>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  )
}
