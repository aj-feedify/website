import { validatorChecks } from './validatorChecks'

export function validName(name) {
  const validationConditions = [
    [name.length < 3, 'Name must be at least 3 characters long'],
  ]

  return validatorChecks(validationConditions, 'Name is valid')
}

export function validUsername(username) {
  const validationConditions = [
    [username.length < 3, 'Username must be at least 3 characters long'],
    [username.length > 20, 'Username must not exceed 20 characters'],
    [/^\d/.test(username), 'Username cannot start with a number'],
    [
      !/^[a-zA-Z0-9]+$/.test(username),
      'Username must only contain letters and numbers',
    ],
  ]

  return validatorChecks(validationConditions, 'Username is valid')
}

export function validPassword(password) {
  const validationConditions = [
    [password.length < 8, 'Password must be at least 8 characters long'],
  ]

  return validatorChecks(validationConditions, 'Password is valid')
}

export function validLoginUser(username, password) {
  const isValidUsername = validUsername(username || '')
  const isValidPassword = validPassword(password || '')

  if (!isValidUsername.ok) return isValidUsername
  if (!isValidPassword.ok) return isValidPassword

  return { ok: true, message: 'Login user is valid' }
}

export function validSignupUser(name, username, password, confirmPassword) {
  const isValidName = validName(name || '')
  const isValidUsername = validUsername(username || '')
  const isValidPassword = validPassword(password || '')

  if (!isValidName.ok) return isValidName
  if (!isValidUsername.ok) return isValidUsername
  if (!isValidPassword.ok) return isValidPassword
  if (password !== confirmPassword) {
    return { ok: false, message: 'Passwords do not match' }
  }

  return { ok: true, message: 'Signup user is valid' }
}
