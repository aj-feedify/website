import { validatorChecks } from './validatorChecks'

export function validTitle(title) {
  const validationConditions = [
    [title.length < 5, 'Name must be at least 5 characters long'],
  ]

  return validatorChecks(validationConditions, 'Title is valid')
}

export function validText(text) {
  const validationConditions = [
    [text.length < 10, 'Name must be at least 10 characters long'],
  ]

  return validatorChecks(validationConditions, 'Text is valid')
}

export function validUid(uid) {
  const validationConditions = [
    [uid.length !== 11, 'UID must be 11 characters long'],
    [!uid.match(/^[0-9a-zA-Z]+$/), 'No such UID'],
  ]

  return validatorChecks(validationConditions, 'Uid is valid')
}
