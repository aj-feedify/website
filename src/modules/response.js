import { validUid } from '../scripts/validator/feeds'
import { validText } from '../scripts/validator/responses'

export async function publishResponse(feed_uid, text) {
  const isValidText = validText(text)
  if (!isValidText.ok) return isValidText

  const newResponse = {
    feed_uid: feed_uid,
    text,
  }

  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/response/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResponse),
    }
  )

  return await data.json()
}

export async function getAllResponses(feed_uid) {
  const isValidFeedUid = validUid(feed_uid)
  if (!isValidFeedUid.ok) return isValidFeedUid

  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/response/${feed_uid}/all`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  return await data.json()
}
