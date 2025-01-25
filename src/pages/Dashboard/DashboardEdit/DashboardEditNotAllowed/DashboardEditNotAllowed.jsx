import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import { validUid } from '../../../../scripts/validator/feeds'

export default function DashboardEditNotAllowed() {
  const urlUid = useRef(window.location.pathname.split('/').pop()).current
  const feedUid = useRef(validUid(urlUid).ok ? urlUid : null).current

  return (
    <>
      <div className="container container_content d_f_ce list_y">
        <div>You are not allowed to edit this feed</div>
        {feedUid && (
          <Link to={`/feed/${feedUid}`}>
            <Button>Go to feed</Button>
          </Link>
        )}
      </div>
    </>
  )
}
