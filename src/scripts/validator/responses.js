import { validatorChecks } from './validatorChecks'

export function validText(text) {
  const validationConditions = [
    [text.length < 1, 'Text must be at least 1 characters long'],
  ]

  return validatorChecks(validationConditions, 'Text is valid')
}
