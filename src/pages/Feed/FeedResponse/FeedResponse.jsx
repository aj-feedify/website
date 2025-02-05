import { useContext, useEffect, useState } from 'react'
import { FeedContext } from '../FeedContext'
import { getAllResponses } from '../../../modules/response'
import Loading from '../../Loading/Loading'
import Button from '../../../components/Button/Button'
import FeedResponseItem from './FeedResponseItem/FeedResponseItem'
import { getPrompt } from './FeedResponseAiPrompt'
import { getAIText } from '../../../scripts/ai/text'
import './FeedResponse.css'

export default function FeedResponse() {
  const { feed, responses, setResponses } = useContext(FeedContext)
  const [ai, setAi] = useState({ res: null, status: 'nothing' })

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

  useEffect(() => {
    async function loadData() {
      const promt = getPrompt(feed, responses.data)
      const data = await getAIText(promt)
      setAi({ ...ai, res: data, status: 'loaded' })
    }

    if (ai.status === 'loading' && !ai.res) loadData()
  }, [ai.status])

  if (responses.status === 'loading') return <Loading />
  if (!responses.data.length)
    return <div className="feed_response_con d_f_ce">No responses yet</div>

  return (
    <>
      <div className="feed_response_con list_y">
        <div className="d_f_jc_sb d_f_ai_ce">
          {responses.data.length} responses
          <Button
            className={`feed_response_colorful_border feed_response_summorize_btn ${
              ai.status === 'loaded' ? 'opa_0' : ''
            }`}
            disabled={['loading', 'loaded'].includes(ai.status)}
            onClick={() => setAi({ ...ai, status: 'loading' })}
          >
            summarize with <span className="feed_response_ai_text">Gemini</span>
          </Button>
        </div>
        <hr className="h" />
        {ai.status !== 'nothing' && (
          <div
            className={`feed_response_colorful_border feed_response_item_con feed_response_ai_con ${
              ai.status === 'loading' ? 'anim' : ''
            }`}
          >
            {ai.status === 'loading' && <Loading />}
            {ai.status === 'loaded' && (
              <>
                <div className="list_y">
                  <div className="d_f_ce feed_response_ai_text">
                    AI Generated
                  </div>
                  <hr className="h feed_response_colorful_border" />
                  <pre>{ai.res}</pre>
                </div>
              </>
            )}
          </div>
        )}
        {responses.data?.map((res, i) => (
          <FeedResponseItem key={i} response={res} />
        ))}
      </div>
    </>
  )
}
