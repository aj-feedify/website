import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FeedContext } from '../FeedContext'
import Button from '../../../components/Button/Button'
import FeedResponse from '../FeedResponse/FeedResponse'
import FeedResponseAlert from '../FeedResponse/FeedResponseAlert/FeedResponseAlert'
import { isCreatorOfFeed, shareFeed } from '../../../modules/feeds'
import { convertISOToDMY } from '../../../scripts/converter/date'
import './FeedPreview.css'

export default function FeedPreview({ feed }) {
  const [whoami, setWhoami] = useState('nobody')
  const [responses, setResponses] = useState({
    responding: false,
    status: 'loading',
    data: [],
  })

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
      <FeedContext.Provider value={{ feed, responses, setResponses }}>
        <div className="list_y">
          <div className="feed_header list_y">
            <div className="d_f_jc_sb d_f_ai_ce">
              <div className="feed_title">{feed.title}</div>
              <div className="list_x">
                {whoami !== 'creator' && (
                  <Button
                    className="feed_btn"
                    onClick={() =>
                      setResponses({ ...responses, responding: true })
                    }
                  >
                    response
                  </Button>
                )}
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
          <FeedResponse />
          {responses.responding && <FeedResponseAlert />}
        </div>
      </FeedContext.Provider>
    </>
  )
}
