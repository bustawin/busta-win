import * as changeCase from 'change-case'

export function humanize(category: string): string {
  return changeCase.capitalCase(category)
}
