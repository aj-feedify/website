import { getUserId } from './user'

export async function createFeed(feed) {
  const userId = getUserId()
  if (!userId.ok) return userId

  feed.user_id = userId.id
  feed.title = feed.title.trim()
  feed.text = feed.text.trim()

  const data = await fetch(`${process.env.REACT_APP_FEEDIFY_API}/feed/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feed),
  })

  return await data.json()
}

export async function getFeed(feedUid) {
  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/feed/${feedUid}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  return await data.json()
}

export async function getAllFeeds() {
  const userId = getUserId()
  if (!userId.ok) return userId

  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/feed/${userId.id}/all`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  return await data.json()
}

export function isCreatorOfFeed(feed_user_id) {
  const userId = getUserId()
  if (!userId.ok) return false

  return feed_user_id === userId.id
}

export async function updateFeed(feed) {
  const userId = getUserId()
  if (!userId.ok) return userId

  const updateFeedInput = {
    user_id: userId.id,
    feed_uid: feed.data.uid,
    new_title: feed.data.title.trim(),
    new_text: feed.data.text.trim(),
  }

  const data = await fetch(`${process.env.REACT_APP_FEEDIFY_API}/feed/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateFeedInput),
  })

  return await data.json()
}

export async function shareFeed(feed) {
  if (navigator.share) {
    try {
      await navigator.share({ ...feed, url: window.location.href })
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  } else {
    return { ok: false, error: 'Web Share API not supported' }
  }
}
