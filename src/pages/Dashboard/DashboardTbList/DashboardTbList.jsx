import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DashboardContext } from '../DashboardContext'
import Loading from '../../Loading/Loading'
import DashboardTbListItem from './DashboardTbListItem/DashboardTbListItem'

export default function DashboardFeedsTbList() {
  const { dashboard } = useContext(DashboardContext)

  if (dashboard.feeds.status === 'loading') return <Loading />
  if (!dashboard.feeds.data?.length)
    return (
      <div className="d_f_ce list_x">
        <div>No feed found.</div>{' '}
        <Link to="/dashboard/new" style={{ color: 'var(--link-text-color)' }}>
          Create new one.
        </Link>
      </div>
    )

  return (
    <>
      {dashboard.feeds.data?.length > 0 &&
        dashboard.feeds.data.map((feed, i) => (
          <DashboardTbListItem key={i} i={i} feed={feed} />
        ))}
    </>
  )
}
