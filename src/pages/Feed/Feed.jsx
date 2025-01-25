import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from '../Loading/Loading'
import FeedPreview from './FeedPreview/FeedPreview'
import FeedNotFound from './FeedNotFound/FeedNotFound'
import { getFeed } from '../../modules/feeds'
import { validUid } from '../../scripts/validator/feeds'

export default function Feed() {
  const urlUid = useRef(window.location.pathname.split('/').pop()).current
  const feedUid = useRef(validUid(urlUid).ok ? urlUid : null).current
  const [feed, setFeed] = useState({
    status: 'loading',
    data: null,
  })

  useEffect(() => {
    async function loadData() {
      const data = await getFeed(feedUid)
      setFeed({ status: 'loaded', data: data.data })
    }
    loadData()
  }, [feedUid])

  if (!feedUid) return <FeedNotFound />
  if (feed.status === 'loading') return <Loading />
  if (feed.data === undefined) return <FeedNotFound />

  return (
    <>
      <div className="container container_content list_y">
        <Routes>
          <Route path="/*" element={<FeedPreview feed={feed.data} />} />
        </Routes>
      </div>
    </>
  )
}
