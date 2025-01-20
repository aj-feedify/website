import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { readFromLocalDb } from '../../../scripts/localDb/localDb'
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import './HeaderProfile.css'

export default function HeaderProfile() {
  const userId = useRef(readFromLocalDb('user_id')).current
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {!userId && (
        <div className="d_f">
          <Link to="/login">Login</Link>
          <div>/</div>
          <Link to="/sign-up">Signup</Link>
        </div>
      )}
      {userId && (
        <div className="header_profile_con">
          <div
            className="header_profile d_f_ce"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            A
          </div>
          {menuOpen && <HeaderMenu setMenuOpen={setMenuOpen} />}
        </div>
      )}
    </>
  )
}
