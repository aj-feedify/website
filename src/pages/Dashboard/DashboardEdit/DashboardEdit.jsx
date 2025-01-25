import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import Textarea from '../../../components/Input/Textarea/Textarea'
import FeedNotFound from '../../Feed/FeedNotFound/FeedNotFound'
import DashboardEditNotAllowed from './DashboardEditNotAllowed/DashboardEditNotAllowed'
import { getFeed, isCreatorOfFeed, updateFeed } from '../../../modules/feeds'
import {
  validText,
  validTitle,
  validUid,
} from '../../../scripts/validator/feeds'
import './DashboardEdit.css'

export default function DashboardEdit() {
  const urlUid = useRef(window.location.pathname.split('/').pop()).current
  const feedUid = useRef(validUid(urlUid).ok ? urlUid : null).current
  const [error, setError] = useState('')
  const [whoami, setWhoami] = useState('nobody')
  const [disabled, setDisabled] = useState({ form: false, btn: true })
  const [feed, setFeed] = useState({
    status: 'loading',
    data: null,
  })
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      const data = await getFeed(feedUid)
      setFeed({ status: 'loaded', data: data.data })
    }
    loadData()
  }, [feedUid])

  useEffect(() => {
    const creator = isCreatorOfFeed(feed.data?.user_id)
    setWhoami(creator ? 'creator' : 'viewer')
  }, [feed.status])

  useEffect(() => {
    if (!feed.data) return

    const isValidTitle = validTitle(feed.data?.title.trim())
    const isValidText = validText(feed.data?.text.trim())

    setDisabled({ ...disabled, btn: !(isValidTitle.ok && isValidText.ok) })
  }, [feed.data?.title, feed.data?.text])

  async function update() {
    setDisabled({ ...disabled, form: true })
    const res = await updateFeed(feed)

    if (!res.ok) {
      setError(res.message)
      setDisabled({ ...disabled, form: false })
      return
    }

    navigate('/dashboard')
    window.location.reload()
  }

  if (!feedUid) return <FeedNotFound />
  if (feed.status === 'loading') return <Loading />
  if (feed.data === undefined) return <FeedNotFound />
  if (whoami !== 'creator') return <DashboardEditNotAllowed />

  return (
    <>
      <div className="dashboard_edit list_y" disabled={disabled.form}>
        <Input
          autoFocus
          placeholder="Title"
          value={feed.data.title}
          className="dashboard_edit_input"
          onChange={(e) =>
            setFeed({ ...feed, data: { ...feed.data, title: e.target.value } })
          }
        />
        {error && <div className="dashboard_edit_error">{error}</div>}
        <Textarea
          placeholder="Description"
          value={feed.data.text}
          className="dashboard_edit_textarea"
          onChange={(e) =>
            setFeed({ ...feed, data: { ...feed.data, text: e.target.value } })
          }
        />
        <Button
          disabled={disabled.btn}
          className="dashboard_edit_btn"
          onClick={update}
        >
          Update
        </Button>
      </div>
    </>
  )
}
