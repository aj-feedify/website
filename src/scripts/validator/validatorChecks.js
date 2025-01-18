export function validatorChecks(validationConditions, validationMessage) {
  for (const [condition, message] of validationConditions) {
    if (condition) {
      return { ok: false, message }
    }
  }

  return { ok: true, message: validationMessage }
}
