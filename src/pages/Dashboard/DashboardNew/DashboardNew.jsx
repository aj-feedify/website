import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContext } from '../DashboardContext'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import Textarea from '../../../components/Input/Textarea/Textarea'
import { createFeed } from '../../../modules/feeds'
import { validText, validTitle } from '../../../scripts/validator/feeds'
import './DashboardNew.css'

export default function DashboardNew() {
  const [error, setError] = useState('')
  const [feed, setFeed] = useState({ title: '', text: '' })
  const [disabled, setDisabled] = useState({ form: false, btn: true })
  const { dashboard, setDashboard } = useContext(DashboardContext)
  const navigate = useNavigate()

  useEffect(() => {
    const isValidTitle = validTitle(feed.title.trim())
    const isValidText = validText(feed.text.trim())

    setDisabled({ ...disabled, btn: !(isValidTitle.ok && isValidText.ok) })
  }, [feed.title, feed.text])

  async function publish() {
    setDisabled({ ...disabled, form: true })
    const res = await createFeed(feed)

    if (!res.ok) {
      setError(res.message)
      setDisabled({ ...disabled, form: false })
      return
    }

    const newFeed = {
      title: feed.title,
      text: feed.text,
      created_at: new Date().toISOString(),
      updated_at: null,
      uid: res.data.uid,
    }

    setDashboard({
      ...dashboard,
      feeds: { ...dashboard.feeds, data: [...dashboard.feeds.data, newFeed] },
    })
    navigate('/dashboard')
  }

  return (
    <>
      <div className="dashboard_new list_y" disabled={disabled.form}>
        <Input
          autoFocus
          placeholder="Title"
          className="dashboard_new_input"
          onChange={(e) => setFeed({ ...feed, title: e.target.value })}
        />
        {error && <div className="dashboard_new_error">{error}</div>}
        <Textarea
          placeholder="Description"
          className="dashboard_new_textarea"
          onChange={(e) => setFeed({ ...feed, text: e.target.value })}
        />
        <Button
          disabled={disabled.btn}
          className="dashboard_new_btn"
          onClick={publish}
        >
          Publish
        </Button>
      </div>
    </>
  )
}
