import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { isCreatorOfFeed, shareFeed } from '../../../modules/feeds'
import { convertISOToDMY } from '../../../scripts/converter/date'
import './FeedPreview.css'

export default function FeedPreview({ feed }) {
  const [whoami, setWhoami] = useState('nobody')

  useEffect(() => {
    const creator = isCreatorOfFeed(feed.user_id)
    setWhoami(creator ? 'creator' : 'viewer')
  }, [])

  async function share() {
    const feedToShare = {
      title: feed.title,
    }

    await shareFeed(feedToShare)
  }

  return (
    <>
      <div className="list_y">
        <div className="feed_header list_y">
          <div className="d_f_jc_sb d_f_ai_ce">
            <div className="feed_title">{feed.title}</div>
            <div className="list_x">
              <Button className="feed_btn" onClick={share}>
                share
              </Button>
              {whoami === 'creator' && (
                <Link to={`/dashboard/edit/${feed.uid}`} className="feed_btn">
                  <Button>edit</Button>
                </Link>
              )}
            </div>
          </div>
          <div className="list_x d_f_ai_ce">
            <div className="feed_date">
              created at: {convertISOToDMY(feed.created_at)}
            </div>
            {feed.updated_at && (
              <>
                <div>|</div>
                <div className="feed_date">
                  updated at: {convertISOToDMY(feed.updated_at)}
                </div>
              </>
            )}
          </div>
          <hr className="h" />
        </div>
        <pre className="feed_text">{feed.text}</pre>
      </div>
    </>
  )
}
