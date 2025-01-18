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
    [/\d/.test(username[0]), 'Username cannot start with a number'],
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
