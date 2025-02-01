import { useContext, useEffect } from 'react'
import { FeedContext } from '../FeedContext'
import { getAllResponses } from '../../../modules/response'
import Loading from '../../Loading/Loading'
import FeedResponseItem from './FeedResponseItem/FeedResponseItem'
import './FeedResponse.css'

export default function FeedResponse() {
  const { feed, responses, setResponses } = useContext(FeedContext)

  useEffect(() => {
    async function loadData() {
      const data = await getAllResponses(feed.uid)
      setResponses({
        ...responses,
        status: 'loaded',
        data: [...responses.data, ...data?.data],
      })
    }
    loadData()
  }, [])

  if (responses.status === 'loading') return <Loading />
  if (!responses.data.length)
    return <div className="feed_response_con d_f_ce">No responses yet</div>

  return (
    <>
      <div className="feed_response_con list_y">
        <div className="d_f_ce">{responses.data.length} responses</div>
        <hr className="h" />
        {responses.data?.map((res, i) => (
          <FeedResponseItem key={i} response={res} />
        ))}
      </div>
    </>
  )
}
