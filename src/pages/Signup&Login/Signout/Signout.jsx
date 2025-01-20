import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSignout } from '../../../modules/user'

export default function Signout() {
  const navigate = useNavigate()

  useEffect(() => {
    userSignout()
    navigate('/')
  }, [])

  return (
    <>
      <div className="container container_content d_f_ce">
        <div style={{ fontSize: '2em' }}>Signing out</div>
      </div>
    </>
  )
}
