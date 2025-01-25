import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { DashboardContext } from './DashboardContext'
import Button from '../../components/Button/Button'
import DashboardTb from './DashboardTb/DashboardTb'
import DashboardNew from './DashboardNew/DashboardNew'
import DashboardEdit from './DashboardEdit/DashboardEdit'
import { getAllFeeds } from '../../modules/feeds'
import './Dashboard.css'

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    feeds: {
      status: 'loading',
      data: [],
    },
  })

  useEffect(() => {
    async function loadData() {
      const data = await getAllFeeds()

      setDashboard((prev) => ({
        ...prev,
        feeds: { status: 'loaded', data: data.data || [] },
      }))
    }
    loadData()
  }, [])

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard }}>
      <div className="container container_content db_tb_container list_y">
        <Routes>
          <Route path="/" element={<DashboardTbComp />} />
          <Route path="/new" element={<DashboardNew />} />
          <Route path="/edit/*" element={<DashboardEdit />} />
        </Routes>
      </div>
    </DashboardContext.Provider>
  )
}

function DashboardTbComp() {
  return (
    <>
      <DashboardTb />
      <Link to="/dashboard/new" className="db_tb_new_btn">
        <Button>New</Button>
      </Link>
    </>
  )
}
