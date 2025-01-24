import { jwtDecode } from 'jwt-decode'
import { deleteFromLocalDb, readFromLocalDb } from '../scripts/localDb/localDb'

export async function signupUser(name, username, password) {
  const userData = { name, username, password }
  const data = await fetch(`${process.env.REACT_APP_FEEDIFY_API}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  return await data.json()
}

export function userSignout() {
  deleteFromLocalDb('user_id')
}

export async function loginUser(username, password) {
  const userData = { username, password }
  const data = await fetch(`${process.env.REACT_APP_FEEDIFY_API}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  return await data.json()
}

export async function getUserProfile() {
  const userId = getUserId()
  if (!userId.ok) return userId

  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/user/${userId.id}/profile`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  return await data.json()
}

export async function updateUserName(newName) {
  const userId = getUserId()
  if (!userId.ok) return userId

  const userData = { id: userId.id, new_name: newName }

  const data = await fetch(
    `${process.env.REACT_APP_FEEDIFY_API}/user/update/name`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }
  )

  return await data.json()
}

function getUserId() {
  const localUserId = readFromLocalDb('user_id')
  if (!localUserId) {
    return { ok: false, message: 'User ID not found' }
  }

  const id = jwtDecode(localUserId).sub
  return { ok: true, id }
}
