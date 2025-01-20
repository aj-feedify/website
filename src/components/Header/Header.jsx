import { Link } from 'react-router-dom'
import HeaderProfile from './HeaderProfile/HeaderProfile'
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
              <div className="header_links list_x d_f_ai_ce">
                <Link to="https://akbarswe.uz">About me</Link>
                <Link to="/dashboard">Dashboard</Link>
                <HeaderProfile />
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  )
}
