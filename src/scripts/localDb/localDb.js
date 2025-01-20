export function saveToLocalDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
  return data
}

export function readFromLocalDb(key) {
  const data = localStorage.getItem(key)
  return JSON.parse(data)
}

export function deleteFromLocalDb(key) {
  localStorage.removeItem(key)
}
