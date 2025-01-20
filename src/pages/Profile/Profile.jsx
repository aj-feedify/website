import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import ProfileName from './ProfileName/ProfileName'
import { getUserProfile } from '../../modules/user'
import './Profile.css'

export default function Profile() {
  const [userData, setUserData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      const data = await getUserProfile()
      setUserData(data)
    }
    loadData()
  }, [])

  if (!userData) return <Loading />
  if (!userData?.ok) {
    navigate('/login')
    return <Loading />
  }

  return (
    <>
      <div className="container container_content d_f_ce">
        <div className="list_y profile_con d_f_ce">
          <div className="profile_avatar d_f_ce">A</div>
          <ProfileName name={userData?.data.name} />
          <div className="profile_username">@{userData?.data.username}</div>
        </div>
      </div>
    </>
  )
}
