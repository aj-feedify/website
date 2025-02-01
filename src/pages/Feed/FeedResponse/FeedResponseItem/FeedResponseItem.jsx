import { convertISOToDMY } from '../../../../scripts/converter/date'
import './FeedResponseItem.css'

export default function FeedResponseItem({ response }) {
  return (
    <>
      <div className="list_y feed_response_item_con">
        <div className="feed_response_item_date">
          {convertISOToDMY(response.created_at)}
        </div>
        <hr className="h" />
        <pre className="feed_response_item_text">{response.text}</pre>
      </div>
    </>
  )
}
