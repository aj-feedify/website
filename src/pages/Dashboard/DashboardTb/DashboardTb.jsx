import DashboardTbHeader from '../DashboardTbHeader/DashboardTbHeader'
import DashboardTbList from '../DashboardTbList/DashboardTbList'
import './DashboardTb.css'

export default function DashboardTb() {
  return (
    <>
      <div className="list_y dashboard_feeds_tb">
        <DashboardTbHeader />
        <DashboardTbList />
      </div>
    </>
  )
}
