import './DashboardTbHeader.css'

export default function DashboardTbHeader() {
  return (
    <>
      <div className="list_y db_tb_header">
        <div className="list_x">
          <div className="db_column_num">№</div>
          <div className="db_column_title">Title</div>
          <div className="db_column_date">Created</div>
          <div className="db_column_date">Updated</div>
          <div className="db_column_url">URL</div>
        </div>
        <hr className="v" />
      </div>
    </>
  )
}
