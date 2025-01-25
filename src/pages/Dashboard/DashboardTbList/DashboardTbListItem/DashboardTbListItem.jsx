import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import { convertISOToDMY } from '../../../../scripts/converter/date'
import './DashboardTbListItem.css'

export default function DashboardTbListItem({ feed, i }) {
  const urlPathname = useRef(`/feed/${feed.uid}`).current
  const [btnTxt, setBtnTxt] = useState('copy')

  useEffect(() => {
    const timeout = setTimeout(() => setBtnTxt('copy'), 0.7e3)
    return () => clearTimeout(timeout)
  }, [btnTxt])

  function handleCopy() {
    navigator.clipboard.writeText(`https://feedify-id.web.app${urlPathname}`)
    setBtnTxt('copied')
  }

  return (
    <>
      <div className="d_f db_tb_list_item">
        <div className="db_column_num">{i + 1}</div>
        <Link to={urlPathname} className="d_f list_x db_tb_list_item_con">
          <div className="db_column_title">{feed.title}</div>
          <div className="db_column_date">
            {convertISOToDMY(feed.created_at)}
          </div>
          <div className="db_column_date">
            {convertISOToDMY(feed.updated_at) || '–'}
          </div>
        </Link>
        <div className="db_column_url">
          <Button onClick={handleCopy}>{btnTxt}</Button>
        </div>
      </div>
    </>
  )
}
